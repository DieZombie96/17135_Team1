import React, { useState } from 'react';

import "./Forms.css"

function Form(props) {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Userid:
                <input
                    type="text"
                    name="userid"
                    value={inputs.userid || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Password:
                <input
                    type="text"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <div>
                <input type="submit" value={props.name} />
            </div>
        </form>
    )
}

export default Form;