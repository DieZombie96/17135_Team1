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

    const Logoff = async (event) => { //logoff
        event.preventDefault();
        // alert(JSON.stringify(inputs));

        const requestOptions = {
            method: "GET"
        }

        await fetch("/logoff/", {  //logoff
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //mode: "cors",
          
        })
        navigate("/");


       
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
        await fetch("/join2/", {  //backend method join 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //mode: "cors",
            body: JSON.stringify({ 'projectId': inputs.projectId, 'description': inputs.description})
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
            <button type="button" onClick={Logoff} style={{ position: "absolute", top: "10px", right: "10px" }}>Logoff</button>
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
            <label>Description:
                <input
                    class="mainpage"
                    type="text"
                    name="description"
                    value={inputs.description || ""}
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