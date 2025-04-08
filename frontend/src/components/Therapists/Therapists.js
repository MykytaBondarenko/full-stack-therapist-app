import './Therapists.css';
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
        if (therapistsData.length < 1) therapistsList = "Couldn't find the client";
        else therapistsList = therapistsData.map(therapist => <li class="therapistBox">{therapist.title} {therapist.name}
                                                        <p>Email: {therapist.email}</p>
                                                        <p>Location: {therapist.location}</p>
                                                        <p>Experience: {therapist.years} years</p>
                                                        <p>Avalability: {therapist.availability} years</p>
                                                    </li>);
        return therapistsList;
    }

    return (
        <div>
            <h1>Therapists page</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="therapistName" placeholder="Therapists's Name" class="findTherapist" onChange={(nameInputHandler)}></input>
                </div>
            </div>
            <ul id="therapistsUL">{therapistsList}</ul>
        </div>
    )
}