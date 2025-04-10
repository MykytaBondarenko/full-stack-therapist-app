import '../Components.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Therapists() {
    const [therapistsData, setTherapistsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function nameInputHandler(e) {
        fetchTherapists(e.target.value);
    }

    useEffect(() => {
        fetchTherapists();
    }, []);

    function fetchTherapists(therapistName) {
        axios
            .get("http://localhost:5000/therapists/", {
                params: {
                    name: therapistName
                }
            })
            .then((response) => {
                setTherapistsData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    function createTherapist() {
        const title = prompt("Enter the therapists's title: ");
        if (!title) {
            alert("No title was entered");
            return;
        }
        const name = prompt("Enter the therapists's name: ");
        if (!name) {
            alert("No name was entered");
            return;
        }
        const emailPattern = "@.+\\..+";
        const email = prompt("Enter the therapists's email: ");
        if (!email) {
            alert("No email was entered");
            return;
        }
        if (!email.match(emailPattern)) {
            alert("Wrong format of an email");
            return;
        }
        const location = prompt("Enter the therapists's location: ");
        if (!location) {
            alert("No location was entered");
            return;
        }
        const years = prompt("Enter the therapists's years of experience");
        if (!years) {
            alert("No years was entered");
            return;
        }
        const availability = prompt("Enter the therapists's availability (TAKING CLIENTS / NOT TAKING CLIENTS): ");
        if (!availability) {
            alert("No availability was entered");
        }
        if (availability != "TAKING CLIENTS" && availability != "NOT TAKING CLIENTS") {
            alert("The format of the availability is wrong");
            return;
        }

        axios
            .post("http://localhost:5000/therapists", {
                title: title,
                name: name,
                email: email,
                location: location,
                years: years,
                availability: availability
            })
            .then((response) => {
                console.log(response);
                document.getElementById("objectName").value = "";
                fetchTherapists();
            })
    }

    function updateTherapist(therapist) {
        const title = prompt("Enter the new title of the therapist: ", therapist.title);
        if (!title) {
            alert("No title was entered");
            return;
        }
        const name = prompt("Enter the new name of the therapist: ", therapist.name);
        if (!name) {
            alert("No name was entered");
            return;
        }
        const emailPattern = "@.+\\..+";
        const email = prompt("Enter the new email of the therapist: ", therapist.email);
        if (!email) {
            alert("No email was entered");
            return;
        }
        if (!email.match(emailPattern)) {
            alert("Wrong format of an email");
            return;
        }
        const location = prompt("Enter the new location of the therapist: ", therapist.location);
        if (!location) {
            alert("No location was entered");
            return;
        }
        const years = prompt("Enter the new years of experience of the therapist: ", therapist.years);
        if (!years) {
            alert("No years were entered");
            return;
        }
        const availability = prompt("Enter the therapists's new availability (TAKING CLIENTS / NOT TAKING CLIENTS)", therapist.availability);
        if (!availability) {
            alert("No availability was entered");
            return;
        }
        if (availability != "TAKING CLIENTS" && availability != "NOT TAKING CLIENTS") {
            alert("The format of the availability is wrong");
            return;
        }

        axios
            .put("http://localhost:5000/therapists", {
                id: therapist.id,
                title: title,
                name: name,
                email: email,
                location: location,
                years: years,
                availability: availability
            })
            .then((response) => {
                console.log(response);
                fetchTherapists();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteTherapist(therapistID) {
        axios
            .delete(`http://localhost:5000/therapists/${therapistID}`)
            .then((response) => {
                console.log(response);
                fetchTherapists();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let therapistsList = getTherapistsList();

    function getTherapistsList() {
        let therapistsList;
        if (therapistsData.length < 1) therapistsList = "Couldn't find the therapist";
        else therapistsList = therapistsData.map(therapist => <li class="objectBox">{therapist.title} {therapist.name}
                                                        <p id="objectEmail">{therapist.email}</p>
                                                        <p>Location: {therapist.location}</p>
                                                        <p>Experience: {therapist.years} years</p>
                                                        <p>Avalability: {therapist.availability}</p>
                                                        <button onClick={() => updateTherapist(therapist)}>Update</button>
                                                        <button onClick={() => deleteTherapist(therapist.id)}>Delete</button>
                                                    </li>);
        return therapistsList;
    }

    return (
        <div>
            <h1>Therapists page</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="objectName" placeholder="Therapists's Name" class="findObject" onChange={(nameInputHandler)}></input>
                </div>
                <div>
                    <button onClick={() => createTherapist()} class="createObject">Add a new therapist</button>
                </div>
            </div>
            <ul id="objectsUL">{therapistsList}</ul>
        </div>
    )
}