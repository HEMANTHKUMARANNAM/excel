import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AnimalLayout from './pages/Animals';
import AnimalQuestion from './pages/Quiz';
import Profile from './account/Profile';
import Tests from './pages/Tests';
import QuizSpell from './pages/QuizSpell';
import LearnEd from './pages/LearnEd';

function App() {
  return (
    <Router basename='/excel'>
        <Routes>
          {/* Public Routes: Accessible when the user is not authenticated */}
          <Route path="/home" element={ <Home />} />
          
          <Route path="/animals" element={  <AnimalLayout/> } />

          <Route path="/quiz/:theme" element={ <AnimalQuestion/> } />
          <Route path="/quizspell/:theme" element={ <QuizSpell/> } />
          <Route path="/quiz/" element={ <Tests/> } />

          <Route path="/profile" element={ <Profile/> } />
          <Route path="/learn" element={ <LearnEd/> } />

        

          {/* Redirect all other routes to /dashboard if user is not logged in */}
          <Route path="*" element={<Navigate to="/home" /> } />
        </Routes>
      </Router>
  );
}

export default App;
