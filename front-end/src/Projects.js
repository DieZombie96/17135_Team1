import React from "react";
import Project from "./Project";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

function Projects(props) {

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/join");
    };

    const [names, setnames] = useState([])
    const [list, setlist] = useState([])
    const [hard1cap, sethard1cap] = useState(0)
    const [hard2cap, sethard2cap] = useState(0)
    const [hard1quant, sethard1quant] = useState(0)
    const [hard2quant, sethard2quant] = useState(0)
    const [change, setchange] = useState(0)

    useEffect(() => {
        const fetchData = async () => {

            const requestOptions = {
                method: "GET"
            }
            // alert('yes')
            await fetch("/getprojects/", requestOptions)   //backend method 
                .then(response => response.json())
                .then(getprojects);
        }
        fetchData()

    }, [change])

    // useEffect(() => {
    //     alert("yes")
    // }, [])

    const rerender = () => {
        console.log("yes");
        setchange(change + 1)
    };

    const getprojects = (data) => {
        // alert(data.response)
        sethard1cap(data.hardware1cap)
        sethard2cap(data.hardware2cap)
        sethard1quant(data.hardware1quant)
        sethard2quant(data.hardware2quant)
        setlist(data.response)
        setnames(data.names)
        // alert(projects)
    }

    // if (list.includes('2')) {
    //     return (
    //         <div>
    //             <header className="App-header">
    //                 <b>PROJECTS</b>
    //                 <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project" />
    //                 <div>
    //                     <Project project_name="Project Name 1" project_id={1} refresh={rerender} project_capacity1={hard1cap} project_capacity2={hard2cap} project_quantity1={hard1quant} project_quantity2={hard2quant} />
    //                     <Project project_name="Project Name 2" project_id={2} refresh={rerender} project_capacity1={hard1cap} project_capacity2={hard2cap} project_quantity1={hard1quant} project_quantity2={hard2quant} />
    //                 </div>
    //             </header>
    //         </div>
    //     );
    // }
    // else if (list.includes('1')) {
    //     return (
    //         <div>
    //             <header className="App-header"><b>PROJECTS</b>
    //                 <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
    //                 <div>

    //                     <Project project_name="Project Name 1" project_id={1} refresh={rerender} project_capacity1={hard1cap} project_capacity2={hard2cap} project_quantity1={hard1quant} project_quantity2={hard2quant} project_users={["list", "of", "valid", "users"]} />
    //                 </div>
    //             </header>
    //         </div>
    //     );

    // }
    // else {
    //     return (
    //         <div>
    //             <header className="App-header"><b>PROJECTS</b>
    //                 <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
    //                 <div>
    //                     {/* 
    //                     <Project project_name="Project Name 1" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
    //                     <Project project_name="Project Name 2" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
    //                     <Project project_name="Project Name 3" project_quantity={100} project_users={["list", "of", "valid", "users"]} /> */}
    //                 </div>
    //             </header>
    //         </div>
    //     );

    // }

    return (
        <div>
            <header className="App-header"><b>PROJECTS</b>
                <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
                <div>
                    {list.map((project, index) => (
                        <Project project_name={names[index]} project_id={project} refresh={rerender} project_capacity1={hard1cap} project_capacity2={hard2cap} project_quantity1={hard1quant} project_quantity2={hard2quant} />
                    ))}
                </div>
            </header>
        </div>
    )


}

export default Projects;