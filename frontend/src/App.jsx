import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async () => {
    if (!text) return;
    await axios.post("http://localhost:5000/notes", { text });
    setText("");
    loadNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    loadNotes();
  };

  return (
  <div className="container">
    <h1>💖 Notes</h1>

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