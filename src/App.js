import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./pages/Form"
import Form2 from "./pages/Form2";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/account" element={<Form2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
