import React, { useState, useEffect } from "react";
import Note from "./Note";
function NotesApp() {
    const [notesData, setNotesData] = useState([]);
  
    useEffect(() => {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        setNotesData(JSON.parse(storedNotes));
      }
    }, []);
  
    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredNotes = notesData.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const onDeleteNote = (id) => {
      
    };
  
    const onEditNote = (id, content) => {
      
    };
  
    return (
      <div className="notes-app">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {filteredNotes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={onDeleteNote}
            onEdit={onEditNote}
          />
        ))}
      </div>
    );
  }
  
  export default NotesApp;