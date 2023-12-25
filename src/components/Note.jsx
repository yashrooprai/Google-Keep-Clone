import React, { useState, useRef } from "react";
import { MdDelete, MdEdit, MdCancel, MdPalette } from "react-icons/md";


function Note({ title, content, onDelete, onEdit, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [bgColor, setBgColor] = useState(() => {
    const storedColor = localStorage.getItem(`note_${id}_color`);
    return storedColor || "";
  });
  const [showColors, setShowColors] = useState(false);
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleColorChange = (color) => {
    setBgColor(color);
    setShowColors(false);
    localStorage.setItem(`note_${id}_color`, color);
  };


  const colorOptions = [
    "#faafa8",
    "#f39f76",
    "#fff8b8",
    "#e2f6d3",
    "#b4ddd3",
    "#d4e4ed",
    "#aeccdc",
    "#d3bfdb",
    "#f6e2dd"
  ];

  const handleSaveClick = () => {
    onEdit(id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };
  const dialogRef = useRef(null);

  const handleDeleteClick = () => {
    dialogRef.current.showModal();
  };

  const confirmDelete = () => {
    onDelete(id);
    dialogRef.current.close();
  };

  const cancelDelete = () => {
    dialogRef.current.close();
  };

  return (
    <div className="note" style={{ backgroundColor: bgColor }}>
      {!isEditing ? (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={handleDeleteClick}>
            <MdDelete style={{ color: 'red' }} size={25} />
          </button>
          <dialog ref={dialogRef} className="modal">
            <p>Are you sure you want to delete this note?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}><MdDelete  style={{ color: 'red' }} size={25} /></button>
              <button onClick={cancelDelete}><MdCancel style={{ color: 'red' }} size={25} /></button>
            </div>
          </dialog>

          <button onClick={handleEditClick}>
            <MdEdit style={{ color: 'red' }} size={25} />
          </button>
          <div className="color-options">
            <button onClick={() => setShowColors(!showColors)}><MdPalette style={{ color: 'red' }} size={25} /></button>
            {showColors && (
              <div className="color-palette">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="note-popup">
          <input
            className="edit-title"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="edit-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Take a note..."
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="close-btn" onClick={handleCloseClick}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>

  );
}

export default Note;
