import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNote } from '../redux/notes/notesSlice'

function Input() {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ id: nanoid(), title, color: selectedColor }))
    setTitle("");
    setSelectedColor("");
  }
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  return (
    <form onSubmit={handleSubmit} >
      <textarea
        className='inputText'
        type='text'
        placeholder='Enter your note here...'
        value={title}
        onFocus={(e) => {
          e.target.placeholder = '';
          e.target.classList.add('no-border');
        }}
        onBlur={(e) => e.target.placeholder = 'Enter your note here...'}
        onChange={(e) => setTitle(e.target.value)}
        style={{ backgroundColor: `${selectedColor}`, paddingTop:10, paddingLeft:10 }} />
      <div className="color-options">
        {['chocolate', 'cadetblue', 'darkkhaki', 'crimson', 'mediumseagreen'].map((color) => (
          <div
            key={color}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          ></div>
        ))}
      </div>
      <button className='btn' onClick={handleSubmit} >Add</button>
    </form>
  )
}
export default Input