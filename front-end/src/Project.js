import React from 'react';
import "./Project.css";
import CustomButton from "./CustomButton";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            joinedColor: '#F4FAFC',
            joinedText: 'join',
            hardware1quant: this.props.project_quantity,
            hardware2quant: this.props.project_quantity,
            hardware1cap: this.props.project_quantity,
            hardware2cap: this.props.project_quantity,
            hardware1input: 0,
            hardware2input: 0,
            operationsdisabled: true
        }
    }

    joinedClicked() {
        if (this.state.joinedColor === "#F4FAFC") {
            this.setState({ joinedColor: '#C3FFBA' });
        }
        else if (this.state.joinedColor === "#C3FFBA") {
            this.setState({ joinedColor: '#F4FAFC' });
        }
        if (this.state.joinedText === "join") {
            this.setState({ joinedText: 'leave' });
            this.setState({ operationsdisabled: false });
        }
        else if (this.state.joinedText === 'leave') {
            this.setState({ joinedText: 'join' });
            this.setState({ operationsdisabled: true });
        }
        console.log("changed");
    }



    renderUsers() {
        var str = "";
        for (var i = 0; i < this.props.project_users.length; i++) {
            if (i === 0) {
                str += this.props.project_users[i];
                continue;
            }
            str += ", " + this.props.project_users[i];
        }
        return str;
    }

    hardware1update = (event) => {
        this.setState({ hardware1input: event.target.value });
    }

    hardware2update = (event) => {
        this.setState({ hardware2input: event.target.value });
    }

    hardware1in() {
        var quant = parseInt(this.state.hardware1quant, 10);
        var input = parseInt(this.state.hardware1input, 10);
        const result = quant + input;
        if (result >= this.state.hardware1cap) {
            this.setState({ hardware1quant: this.state.hardware1cap });
        }
        else if (result < this.state.hardware1cap) {
            this.setState({ hardware1quant: result });
        }
    }

    hardware1out() {
        if ((this.state.hardware1quant - this.state.hardware1input) <= 0) {
            this.setState({ hardware1quant: 0 });
        }
        else if ((this.state.hardware1quant - this.state.hardware1input) > 0) {
            this.setState({ hardware1quant: this.state.hardware1quant - this.state.hardware1input });
        }
    }

    hardware2in() {
        var quant = parseInt(this.state.hardware2quant, 10);
        var input = parseInt(this.state.hardware2input, 10);
        const result = quant + input;
        if (result >= this.state.hardware2cap) {
            this.setState({ hardware2quant: this.state.hardware2cap });
        }
        else if (result < this.state.hardware1cap) {
            this.setState({ hardware2quant: result });
        }
    }

    hardware2out() {
        if ((this.state.hardware2quant - this.state.hardware2input) <= 0) {
            this.setState({ hardware2quant: 0 });
        }
        else if ((this.state.hardware2quant - this.state.hardware2input) > 0) {
            this.setState({ hardware2quant: this.state.hardware2quant - this.state.hardware2input });
        }
    }

    render() {
        return (
            <div className="Project" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box width={1270} height={0} borderRadius={2} component="section" sx={{ p: 10, border: '3px solid black', bgcolor: this.state.joinedColor }}>
                    <Box textAlign="left">
                        <div className="name"><name><b>{this.props.project_name}</b></name></div>
                    </Box>
                    <Box className="users">
                        <div className="users"><name>{this.renderUsers()}</name></div>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Box>
                                <div className="projectstatus1"><p><b>HWSet1: {this.state.hardware1quant}/{this.state.hardware1cap}</b></p></div>
                            </Box>
                            <Box>
                                <div className="projectstatus2"><p><b>HWSet2: {this.state.hardware2quant}/{this.state.hardware2cap}</b></p></div>
                            </Box>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Box className="input1">
                                <TextField disabled={this.state.operationsdisabled} onChange={this.hardware1update.bind(this)} size="small" width={20} id="outlined-basic" label="Enter qty" variant="outlined" />
                            </Box>
                            <Box className="input2">
                                <TextField disabled={this.state.operationsdisabled} onChange={this.hardware2update.bind(this)} size="small" width={20} id="outlined-basic" label="Enter qty" variant="outlined" />
                            </Box>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Box className="inbutton1">
                                <CustomButton disabled={this.state.operationsdisabled} clicked={this.hardware1in.bind(this)} width={125} fontsize={14} name="Check In"></CustomButton>
                            </Box>
                            <Box className="inbutton2" textAlign="right">
                                <CustomButton disabled={this.state.operationsdisabled} clicked={this.hardware2in.bind(this)} width={125} fontsize={14} name="Check In"></CustomButton>
                            </Box>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Box className="outbutton1" textAlign="right">
                                <CustomButton disabled={this.state.operationsdisabled} clicked={this.hardware1out.bind(this)} width={125} fontsize={14} name="Check Out"></CustomButton>
                            </Box>
                            <Box className="outbutton2" textAlign="right">
                                <CustomButton disabled={this.state.operationsdisabled} clicked={this.hardware2out.bind(this)} width={125} fontsize={14} name="Check Out"></CustomButton>
                            </Box>
                        </div>
                        <Box className="joinbutton">
                            <CustomButton disabled={false} clicked={this.joinedClicked.bind(this)} height={50} width={95} fontsize={25} name={this.state.joinedText}></CustomButton>
                        </Box>
                    </div>
                </Box>
            </div>
        );
    }
}

export default Project;