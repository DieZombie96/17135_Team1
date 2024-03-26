import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "./Forms.css"
function FormsJoin(props) {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    }

    const joinButton = async (event) => {
        event.preventDefault();
        // alert(JSON.stringify(inputs));

        const requestOptions = {
            method: "GET"
        }

        await fetch("/join/", {  //backend method join 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //mode: "cors",
            body: JSON.stringify({ 'projectId': inputs.projectId})
        })

        await fetch("/checkProjectId/", requestOptions)   //backend method 
            .then(response => response.json())
            .then(authentication);
    }

    const authentication = (data) => {  //checks if user is already in it, if it doesnt exist, makes a new one
        if (data.response === "Success") {
            // alert('yes')
            navigate("/projects")
        }
        else {
            alert(data.response)
        }
    }


    return (
        <form onSubmit={joinButton} style={{ marginTop: 300 }}>
            <label>ProjectId:
                <input
                    class="mainpage"
                    type="text"
                    name="projectId"
                    value={inputs.projectId || ""}
                    onChange={handleChange}
                />
            </label>
            <div>
                <input type="submit" value={props.name} />
            </div>
        </ form>
    )
}

export default FormsJoin;