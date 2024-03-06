import './App.css';
import Login from './login';
import Project from './Project';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
