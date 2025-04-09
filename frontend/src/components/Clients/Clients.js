import '../Components.css';
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

    function createClient() {
        const name = prompt("Enter the client's name: ");
        if (!name) {
            alert("No name was entered");
            return;
        }
        const emailPattern = "@.+\..+";
        const email = prompt("Enter the client's email: ");
        if (!email) {
            alert("No email was entered");
            return;
        }
        if (!email.match(emailPattern)) {
            alert("Wrong format of an email");
            return;
        }
        const phone_number = prompt("Enter the client's phone number: ");
        if (!phone_number) {
            alert("No phone number was entered");
            return;
        }
        const regularity = prompt("Enter the client's regularity of the sessions (WEEKLY / MONTHLY)");
        if (!regularity) {
            alert("No regularity was entered");
            return;
        }
        if (regularity != "WEEKLY" && regularity != "MONTHLY") {
            alert("The format of the regularity is wrong");
            return;
        }

        axios
            .post("http://localhost:5000/clients", {
                name: name,
                email: email,
                phone_number: phone_number,
                regularity: regularity
            })
            .then((response) => {
                console.log(response);
                document.getElementById("objectName").value = "";
                fetchClients();
            })
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let clientsList = getClientsList();

    function getClientsList() {
        let clientsList;
        if (clientsData.length < 1) clientsList = "Couldn't find the client";
        else clientsList = clientsData.map(client => <li class="objectBox">{client.name}
                                                        <p id="objectEmail">{client.email}</p>
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
                    <input type="text" id="objectName" placeholder="Client's Name" class="findObject" onChange={(nameInputHandler)}></input>
                </div>
                <div>
                    <button onClick={() => createClient()} class="createObject">Add a new client</button>
                </div>
            </div>
            <ul id="objectsUL">{clientsList}</ul>
        </div>
    )
}