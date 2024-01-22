import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('notesState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error("Error loading state from localStorage:", error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('notesState', serializedState);
    } catch (error) {
        console.error("Error saving state to localStorage:", error);
    }
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState: loadState() || {
        items: [
            {
                id: 1,
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisi sit amet eros iaculis volutpat ac sit amet ipsum.",
                color: "darkkhaki"
            },
            {
                id: 2,
                title: "Cras egestas feugiat dolor, vitae volutpat elit condimentum a. Suspendisse cursus blandit massa.",
                color: "chocolate"
            },
            {
                id: 3,
                title: " Etiam tempor mattis urna, eget tempor nisi pretium eget.",
                color: "cadetblue"
            },

        ],
    },
    reducers: {
        addNote: (state, action) => {
            state.items.push(action.payload);
            saveState(state);

        },
        removeNote: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
            saveState(state);

        },
    },
})

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;