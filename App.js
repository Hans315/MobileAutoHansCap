import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useTimer } from './services/timerService'; // Import Timer Service
import { fetchTasks, addTask, toggleTaskStatus } from './services/taskService'; // Import Task Service
import { fetchNotes, addNote, deleteNote } from './services/notesService'; // Import Notes Service

export default function App() {
  // States for Task Management
  const [tasks, setTasks] = useState(fetchTasks());
  const [newTask, setNewTask] = useState('');

  // States for Notes
  const [notes, setNotes] = useState(fetchNotes());
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Timer Service States and Handlers
  const { time, start, stop, reset, isRunning } = useTimer();

  // Handlers for Task Management
  const handleAddTask = () => {
    setTasks(addTask(tasks, newTask));
    setNewTask('');
  };

  const handleToggleTaskStatus = (taskId) => {
    setTasks(toggleTaskStatus(tasks, taskId));
  };

  // Handlers for Notes
  const handleAddNote = () => {
    if (noteTitle && noteContent) {
      setNotes(addNote(notes, { title: noteTitle, content: noteContent }));
      setNoteTitle('');
      setNoteContent('');
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(deleteNote(notes, noteId));
  };

  return (
    <View style={styles.container}>
      {/* Timer Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Timer Service</Text>
        <Text style={styles.timer}>{time} seconds</Text>
        <View style={styles.buttonRow}>
          <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? stop : start} />
          <Button title="Reset" onPress={reset} />
        </View>
      </View>

      {/* Task Management Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Task Management Service</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add Task" onPress={handleAddTask} />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.task, item.completed && styles.completedTask]}
              onPress={() => handleToggleTaskStatus(item.id)}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Notes Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Notes Service</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={noteTitle}
          onChangeText={setNoteTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={noteContent}
          onChangeText={setNoteContent}
        />
        <Button title="Add Note" onPress={handleAddNote} />
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.note}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Button title="Delete" onPress={() => handleDeleteNote(item.id)} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  task: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 4,
  },
  completedTask: {
    backgroundColor: '#d3ffd3',
  },
  note: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  noteTitle: {
    fontWeight: 'bold',
  },
});
