import React from "react";

function Button(props) {

    const handleClick = (event) => {
        event.preventDefault();
        alert("Create bfds user popup");
    }


    return (
        <div>
            <button type="button" onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default Button