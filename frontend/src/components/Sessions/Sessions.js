import '../Components.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sessions() {
    const [sessionsData, setSessionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /*function nameInputHandler(e) {
        fetchClients(e.target.value);
    }*/

    useEffect(() => {
        fetchSessions();
    }, []);

    function fetchSessions(therapistID, clientID) {
        axios
            .get("http://localhost:5000/sessions/", {
                params: {
                    therapist_id: therapistID,
                    client_id: clientID
                }
            })
            .then((response) => {
                setSessionsData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    function createSession() {
        const therapist_id = prompt("Enter the therapists's id: ");
        if (!therapist_id) {
            alert("No id was entered");
            return;
        }
        const client_id = prompt("Enter the clients's id: ");
        if (!client_id) {
            alert("No id was entered");
            return;
        }
        const notes = prompt("Enter the session's notes: ", "None");
        if (!notes) {
            alert("No notes were entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        const date = prompt("Enter the session's date (in a YYYY-MM-DD format): ");
        if (!date) {
            alert("No date was entered");
            return;
        }
        if (!date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const lengthPattern = "^00:\\d{2}:\\d{2}$";
        const length = "00:" + prompt("Enter the session's length in time (in a HH:MM format): ");
        if (!length) {
            alert("No time was entered");
            return;
        }
        if (!length.match(lengthPattern)) {
            alert("Wrong format of time");
            return;
        }

        axios
            .post("http://localhost:5000/sessions", {
                therapist_id: therapist_id,
                client_id: client_id,
                notes: notes,
                date: date,
                length: length
            })
            .then((response) => {
                console.log(response);
                document.getElementById("therapistID").value = "";
                document.getElementById("clientID").value = "";
                fetchSessions();
            })
    }

    function updateSession(session) {
        const therapist_id = prompt("Enter the new id of the therapist: ", session.therapist_id);
        if (!therapist_id) {
            alert("No id was entered");
            return;
        }
        const client_id = prompt("Enter the new id of the client: ", session.client_id);
        if (!client_id) {
            alert("No id was entered");
            return;
        }
        const notes = prompt("Enter the new notes of the session: ", session.notes);
        if (!notes) {
            alert("No notes were entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        let curDate = new Date(session.date); // for some reason when I try just to pass sesson.date in the prompt, it shows the previous day
        curDate.setDate(curDate.getDate());
        const month = (curDate.getMonth() + 1) >= 10 ? (curDate.getMonth() + 1) : "0" + (curDate.getMonth() + 1);
        const day = curDate.getDate() >= 10 ? curDate.getDate() : "0" + curDate.getDate();
        const prevDate = curDate.getFullYear() + "-" + month + "-" + day;
        const date = prompt("Enter the session's new date (in a YYYY-MM-DD format): ", prevDate);
        if (!date) {
            alert("No date was entered");
            return;
        }
        if (!date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const lengthPattern = "^00:\\d{2}:\\d{2}$";
        const length = "00:" + prompt("Enter the session's new length in time (in a HH:MM format): ", session.length.substring(3,8));
        if (!length) {
            alert("No time was entered");
            return;
        }
        if (!length.match(lengthPattern)) {
            alert("Wrong format of time");
            return;
        }

        axios
            .put("http://localhost:5000/sessions", {
                id: session.id,
                therapist_id: therapist_id,
                client_id: client_id,
                notes: notes,
                date: date,
                length: length
            })
            .then((response) => {
                console.log(response);
                fetchSessions();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteSession(sessionID) {
        axios
            .delete(`http://localhost:5000/sessions/${sessionID}`)
            .then((response) => {
                console.log(response);
                fetchSessions();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let sessionsList = getSessionsList();

    function getSessionsList() {
        let sessionsList;
        if (sessionsData.length < 1) sessionsList = "Couldn't find the session";
        else sessionsList = sessionsData.map(session => <li class="objectBox">{session.name}
                                                        <p>Therapist id: {session.therapist_id}</p>
                                                        <p>Client id: {session.client_id}</p>
                                                        <p>Notes: <button onClick={() => getNotes(session.notes)}>Click to see</button></p>
                                                        <p>Date: {new Date(session.date).toDateString()}</p>
                                                        <p>Length: {session.length.substring(4,8)}h</p>
                                                        <button onClick={() => updateSession(session)}>Update</button>
                                                        <button onClick={() => deleteSession(session.id)}>Delete</button>
                                                    </li>);
        return sessionsList;
    }

    function getNotes(note) {
        alert(note);
    }

    return (
        <div>
            <h1>Sessions page</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="therapistID" placeholder="Therapists's Id" class="findObject"></input>
                    <input type="text" id="clientID" placeholder="Clients's Id" class="findObject"></input>
                    <button onClick={() => fetchSessions(document.getElementById('therapistID').value, document.getElementById('clientID').value)} class="findArtist">Search session</button>
                </div>
                <div>
                    <button onClick={() => createSession()} class="createObject">Add a new session</button>
                </div>
            </div>
            <ul id="objectsUL">{sessionsList}</ul>
        </div>
    )
}