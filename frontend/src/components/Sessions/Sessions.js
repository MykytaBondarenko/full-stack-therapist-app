import './Sessions.css';
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

    function fetchSessions() {
        axios
            .get("http://localhost:5000/sessions/", {
                params: {
                    //name: sessionName
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

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let sessionsList = getSessionsList();

    function getSessionsList() {
        let sessionsList;
        if (sessionsData.length < 1) sessionsList = "Couldn't find the session";
        else sessionsList = sessionsData.map(session => <li class="sessionBox">{session.name}
                                                        <p>Therapist id: {session.therapist_id}</p>
                                                        <p>Client id: {session.client_id}</p>
                                                        <p>Notes: <button onClick={() => getNotes(session.notes)}>Click to see</button></p>
                                                        <p>Date: {new Date(session.date).toDateString()}</p>
                                                        <p>Length: {session.length.substring(4,8)}h</p>
                                                    </li>);
        return sessionsList;
    }

    function getNotes(note) {
        alert(note);
    }

    return (
        <div>
            <h1>Sessions page</h1>
            <ul id="sessionsUL">{sessionsList}</ul>
        </div>
    )
}