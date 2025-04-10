import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TraineeView from "./TraineeView"; // You'll create this file
import TrainerView from "./TrainerView"; // You'll create this too

function App() {
  return (
    <Router>
      <nav style={{ margin: "1rem" }}>
        <Link to="/">Trainee</Link> | <Link to="/trainer">Trainer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TraineeView />} />
        <Route path="/trainer" element={<TrainerView />} />
      </Routes>
    </Router>
  );
}

export default App;