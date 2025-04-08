import './Clients.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Clients() {
    const [clientsData, setClientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function nameInputHandler(e) {
        fetchClients(e.target.value);
    }

    useEffect(() => {
        fetchClients();
    }, []);

    function fetchClients(clientName) {
        axios
            .get("http://localhost:5000/clients/", {
                params: {
                    name: clientName
                }
            })
            .then((response) => {
                setClientsData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let clientsList = getClientsList();

    function getClientsList() {
        let clientsList;
        if (clientsData.length < 1) clientsList = "Couldn't find the client";
        else clientsList = clientsData.map(client => <li class="clientBox">{client.name}
                                                        <p>Email: {client.email}</p>
                                                        <p>Phone No: {client.phone_number}</p>
                                                        <p>Regularity: {client.regularity}</p>
                                                    </li>);
        return clientsList;
    }

    return (
        <div>
            <h1>Clients page</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="clientName" placeholder="Client's Name" class="findClient" onChange={(nameInputHandler)}></input>
                </div>
            </div>
            <ul id="clientsUL">{clientsList}</ul>
        </div>
    )
}