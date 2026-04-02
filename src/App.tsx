import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnsubscribePage from './UnsubscribePage';
import WeatherPrivacy from './WeatherPrivacy';
import Framer from './Framer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
        <Route path="/weatherprivacy" element={<WeatherPrivacy />} />
        <Route path="/*" element={<Framer />} />
      </Routes>
    </Router>
  );
}

export default App;
