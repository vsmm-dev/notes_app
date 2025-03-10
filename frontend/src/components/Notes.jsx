import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener las notas desde la API
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axiosInstance.get('/notes');
                setNotes(response.data);  // Suponiendo que la API devuelve las notas con sus categorías
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch notes');
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="card shadow-lg p-4 mb-4">
            <h3 className="text-center mb-4">My Notes</h3>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <div>
                    <h5>Active Notes</h5>
                    <ul className="list-group">
                        {notes.filter(note => !note.archived).map((note) => (
                            <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6>{note.title}</h6>
                                    <p>{note.content}</p>
                                    <div className="badge bg-info">{note.categories.map(category => category.name).join(', ')}</div>
                                </div>
                                <div>
                                    <button
                                        className={`btn btn-sm ${note.archived ? 'btn-secondary' : 'btn-warning'} mx-2`}
                                        onClick={() => toggleArchive(note.id)}
                                    >
                                        {note.archived ? 'Unarchive' : 'Archive'}
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteNote(note.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h5 className="mt-4">Archived Notes</h5>
                    <ul className="list-group">
                        {notes.filter(note => note.archived).map((note) => (
                            <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6>{note.title}</h6>
                                    <p>{note.content}</p>
                                    <div className="badge bg-info">{note.categories.map(category => category.name).join(', ')}</div>
                                </div>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => toggleArchive(note.id)}
                                >
                                    Unarchive
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notes;
