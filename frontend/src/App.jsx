import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const addNote = () => {
    if (!text.trim()) return;

    const updatedNotes = [...notes, { text }];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setText("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="container">
      <h1>💖 Notes App</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="addBtn" onClick={addNote}>
          Add
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="empty">No notes yet ✨</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <span>{note.text}</span>

              <button
                className="deleteBtn"
                onClick={() => deleteNote(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
