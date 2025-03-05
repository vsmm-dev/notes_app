import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProtectedPage from './pages/ProtectedPage';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from "./components/Logout.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/protected" element={<ProtectedRoute element={<ProtectedPage />} />} />
            </Routes>
        </Router>
    );
}

export default App;
