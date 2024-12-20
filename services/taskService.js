export const fetchTasks = () => {
    const tasks = [
      { id: 1, title: 'Complete the project', completed: false },
      { id: 2, title: 'Buy groceries', completed: true },
    ];
    return tasks;
  };
  
  export const addTask = (tasks, newTask) => {
    return [...tasks, { id: tasks.length + 1, title: newTask, completed: false }];
  };
  
  export const toggleTaskStatus = (tasks, taskId) => {
    return tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  };
  