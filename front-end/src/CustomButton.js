import React from 'react';
import Button from '@mui/material/Button';

class CustomButton extends React.Component {

    constructor(props){
        super(props);
        this.clicked = this.props.clicked;
        this.state = {
            disabled: false
        }
    }

    handleclicked(){
        this.clicked();
    }

    render(){
        return(
            <Button variant="outlined" sx={{
                color: "#000000",
                bgcolor: "#dadada",
                border: "3px black solid", 
                height: this.props.height, 
                width: this.props.width, 
                fontSize: this.props.fontsize,
                ':hover': {
                    bgcolor: "#7f7f7f",
                    color: "#000000",
                    border: "3px black solid", 
                }
                }} onClick = {this.handleclicked.bind(this)} disabled = {this.props.disabled}><b>{this.props.name}</b></Button>
        );
    }
}

export default CustomButton;