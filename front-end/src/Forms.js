import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "./Forms.css"

function Form(props) {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(JSON.stringify(inputs));

        const requestOptions = {
            method: "GET"
        }



        await fetch("/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //mode: "cors",
            body: JSON.stringify({ 'username': inputs.username, 'userid': inputs.userid, 'password': inputs.password })
        })

        await fetch("/credentials/", requestOptions)
            .then(response => response.json())
            .then(authentication);
    }

    const authentication = (data) => {
        if (data.response === "Success") {
           
            // navigate("/projects") 
            navigate("/join")
        }
        else {
            alert(data.response)
        }
    }


    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 300 }}>
            <label>Username:
                <input
                    class="mainpage"
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Userid:
                <input
                    class="mainpage"
                    type="text"
                    name="userid"
                    value={inputs.userid || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Password:
                <input
                    class="mainpage"
                    type="text"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <div>
                <input type="submit" value={props.name} />
            </div>
        </ form>
    )
}

export default Form;