import React, { useState } from 'react';

import Button from './button'
import Form from './Forms';
import ProjectEntry from './ProjectEntry';

function Login() {

    const [newUser, setNewUser] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setNewUser(true);
    }

    if (newUser) {
        return (
            <div >
                <Form name="Create Account" />
            </div>
        )
    }
    else {
        return (
            <div >
                <Form name="Sign In" />
                <div style={{ margin: 10 }}>
                    <Button name="New User" onClick={handleClick} />
                </div>
            </div>
        )
    }
}

export default Login