import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Framer from './Framer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Framer />} />
      </Routes>
    </Router>
  );
}

export default App;
