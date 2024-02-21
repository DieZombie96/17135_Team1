import React from "react";

function Button(props) {

    const handleClick = (event) => {
        event.preventDefault();
        alert("Create new user popup");
    }


    return (
        <div>
            <button type="button" onClick={handleClick}>{props.name}</button>
        </div>
    )
}

export default Button