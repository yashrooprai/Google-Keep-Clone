import React, { useState, useEffect } from "react";
import "./styles.css";

import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import NotesApp from "./components/NotesApp";

function App(props) {
  const [notes, setNotes] = useState([]);

  // Function to retrieve notes from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Function to update local storage whenever 'notes' state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevValue) => {
      return [newNote, ...prevValue];
    });
  }

  function deleteNotes(id) {
    setNotes((preValue) => {
      return [...preValue.filter((note, index) => index !== id)];
    });
  }

  function editNote(id, updatedNote) {
    setNotes((prevNotes) => {
      return prevNotes.map((note, index) => {
        if (index === id) {
          return { ...note, ...updatedNote };
        }
        return note;
      });
    });
  }

  return (
    
    <div className="App">
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
          onEdit={editNote}
        />
      ))}
    </div>
  );
}

export default App;
