import './App.css';
import Login from './login';
import Projects from './Projects';
import FormsJoin from './FormsJoin';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<FormsJoin />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
