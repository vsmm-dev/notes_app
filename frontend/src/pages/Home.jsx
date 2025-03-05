import React from 'react';
import Notes from "../components/Notes.jsx";

const Home = () => {
    return (
        <div className="container vh-100 vw-100 my-5">
            <h1 className="text-center mb-4">Home Page</h1>
            <p className="text-center mb-4">Welcome to the Home Page!</p>

            <Notes /> {/* Agregar el componente Notes aquí */}
        </div>
    );
};

export default Home;
