import React from 'react';
import "./Project.css";
import CustomButton from "./CustomButton";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            joinedColor: '#C3FFBA',
            joinedText: 'leave',
            hardware1quant: this.props.project_quantity1,
            hardware2quant: this.props.project_quantity2,
            hardware1cap: this.props.project_capacity1,
            hardware2cap: this.props.project_capacity2,
            hardware1input: 0,
            hardware2input: 0,
            operationsdisabled: false
        }
    }

    hardware1update = (event) => {
        this.setState({ hardware1input: event.target.value });
    }

    hardware2update = (event) => {
        this.setState({ hardware2input: event.target.value });
    }

    hardware1in() {
        var input = parseInt(this.state.hardware1input, 10);
        if (input <= 0 || isNaN(input)) {
            alert("Please enter a valid quantity");
            return;
        }
        var fetchURL = "/checkin/" + this.props.project_id + "/" + input + "/" + 1;
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                // alert(data.checkedin + " hardware sets checked in!")
                this.setState({ hardware1quant: data.checkedin });
                this.props.refresh();
            })
            .catch(error => {
                console.log("error");
            });
    }

    hardware1out() {
        if (this.state.hardware1input <= 0 || isNaN(this.state.hardware1input)) {
            alert("Please enter a valid quantity");
            return;
        }
        var fetchURL = "/checkout/" + this.props.project_id + "/" + this.state.hardware1input + "/" + 1;
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                // alert(data.checkedout + " hardware sets checked out!")
                this.setState({ hardware1quant: data.checkedout });
                this.props.refresh();
            })
            .catch(error => {
                console.log("error");
            });
    }

    hardware2in() {
        var input = parseInt(this.state.hardware2input, 10);
        if (input <= 0 || isNaN(input)) {
            alert("Please enter a valid quantity");
            return;
        }
        var fetchURL = "/checkin/" + this.props.project_id + "/" + input + "/" + 2;
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                // alert(data.checkedin + " hardware sets checked in!")
                this.setState({ hardware2quant: data.checkedin });
                this.props.refresh();
            })
            .catch(error => {
                console.log("error");
            });
    }

    hardware2out() {
        if (this.state.hardware2input <= 0 || isNaN(this.state.hardware2input)) {
            alert("Please enter a valid quantity");
            return;
        }
        var fetchURL = "/checkout/" + this.props.project_id + "/" + this.state.hardware2input + "/" + 2;
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                // alert(data.checkedout + " hardware sets checked out!")
                this.setState({ hardware2quant: data.checkedout });
                this.props.refresh();
            })
            .catch(error => {
                console.log("error");
            });
    }

    render() {
        return (
            <div className="Project" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box width={1270} height={0} borderRadius={2} component="section" sx={{ p: 10, border: '3px solid black', bgcolor: this.state.joinedColor }}>
                    <Box textAlign="left">
                        <div className="name"><name><b>{this.props.project_name}</b></name></div>
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
                    </div>
                </Box>
            </div>
        );
    }
}

export default Project;