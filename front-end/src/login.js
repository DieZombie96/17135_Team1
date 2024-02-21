import React from "react";

import Button from './button'
import Form from './Forms';

function Login() {
    return (
        <div >
            <Form />
            <div style={{ margin: 10 }}>
                <Button name="New User" />
            </div>
        </div>
    )
}

export default Login