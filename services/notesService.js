export const fetchNotes = () => {
    return [
      { id: 1, title: 'Buy groceries', content: 'Milk, Bread, Eggs' },
      { id: 2, title: 'Meeting Notes', content: 'Discuss project deadlines' },
    ];
  };
  
  export const addNote = (notes, newNote) => {
    return [...notes, { id: notes.length + 1, ...newNote }];
  };
  
  export const deleteNote = (notes, noteId) => {
    return notes.filter((note) => note.id !== noteId);
  };
  