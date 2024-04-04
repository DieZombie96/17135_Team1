import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "./Forms.css"
function FormsJoin(props) {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => { //textbox change
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    }

    const joinButton = async (event) => { //join button
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
        alert(data.response)
    }

    const viewProjects = () => {
        navigate("/projects");
    }

    const createProject = async (event) => { //createproject
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

        await fetch("/createProj/", requestOptions)   //backend method 
            .then(response => response.json())
            .then(authCreate);
    }

    const authCreate = (data) => {  //checks if user is already in it, if it doesnt exist, makes a new one
        alert(data.response)
    }


    return (
        <form onSubmit={joinButton} style={{ marginTop: 300 }}>
            <div>
                 <header ><b>Join Project</b> </header>
            </div>
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
                <input type="submit" value="Join" />
            </div>
            <div>
                <button type="button" onClick={viewProjects}>View All Projects</button>
            </div>
            <div>
                <button type="button" onClick={createProject}>Create Project</button>
            </div>
        </ form>
    )
}

export default FormsJoin;