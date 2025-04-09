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
            </div>
            <ul id="objectsUL">{therapistsList}</ul>
        </div>
    )
}