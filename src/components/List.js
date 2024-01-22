import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNote } from '../redux/notes/notesSlice';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'

function List() {
    const [searchTerm, setSearchTerm] = useState("");
    const items = useSelector((state) => state.notes.items);
    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const dispatch = useDispatch();
    const handleRemoveNote = (id) => {
        dispatch(removeNote(id));
    };
    return (
        <div>
            <input
                className='searchBar'
                type='search'
                placeholder='Search...'
                value={searchTerm}
                onFocus={(e) => {
                    e.target.placeholder = '';
                    e.target.classList.add('no-border');
                }}
                onBlur={(e) => e.target.placeholder = 'Search...'}
                onChange={(e) => setSearchTerm(e.target.value)} />
            <SearchIcon style={{ marginLeft: 10 }} />
            <div className="note-container">
                {filteredItems.map((item) => (
                    <div key={item.id} className={`note-card`} style={{ backgroundColor: item.color }}>
                        <div style={{ paddingTop:50, paddingBottom:10 }}>{item.title}</div>
                        <DeleteIcon
                            className="delete-icon"
                            onClick={() => handleRemoveNote(item.id)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List