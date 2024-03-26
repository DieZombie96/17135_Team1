import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';


function Join() { 
  
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

export default Join;
