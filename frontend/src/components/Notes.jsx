import React, { useState } from 'react';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [noteContent, setNoteContent] = useState('');
    const [archivedNotes, setArchivedNotes] = useState([]);

    // Agregar una nueva nota
    const addNote = () => {
        if (!noteContent.trim()) return; // Prevenir notas vacías

        const newNote = {
            id: Date.now(),
            content: noteContent,
            archived: false,
        };
        setNotes([...notes, newNote]);
        setNoteContent('');
    };

    // Eliminar una nota
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    // Archivar o desarchivar una nota
    const toggleArchive = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        ));
        if (archivedNotes.find(note => note.id === id)) {
            setArchivedNotes(archivedNotes.filter(note => note.id !== id));
        } else {
            const archivedNote = notes.find(note => note.id === id);
            setArchivedNotes([...archivedNotes, archivedNote]);
        }
    };

    return (
        <div className="card shadow-lg p-4 mb-4">
            <h3 className="text-center mb-4">My Notes</h3>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    rows="3"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your note here..."
                    style={{resize: 'none'}}
                ></textarea>
            </div>
            <button className="btn btn-primary w-100" onClick={addNote}>Add Note</button>

            <div className="mt-4">
                <h5>Active Notes</h5>
                <ul className="list-group">
                    {notes.filter(note => !note.archived).map((note) => (
                        <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{note.content}</span>
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
            </div>

            <div className="mt-4">
                <h5>Archived Notes</h5>
                <ul className="list-group">
                    {archivedNotes.map((note) => (
                        <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{note.content}</span>
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
        </div>
    );
};

export default Notes;
