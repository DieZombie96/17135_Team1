import './App.css';
import Login from './login';
import Projects from './Projects';
import FormsJoin from './FormsJoin';
import { Route, Routes } from "react-router-dom";
import { useReducer, useState } from 'react';

function App() {

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const thing = () => {
    console.log("object");
    forceUpdate();
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<FormsJoin />} />
        <Route path="/projects" element={<Projects test={thing} />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
