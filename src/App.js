import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./pages/Form"
import Form2 from "./pages/Form2";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/account" element={<Form2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
