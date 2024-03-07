import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updateTasks = [...tasks];
    updateTasks.splice(index, 1);
    setTasks(updateTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              {task}
              <button
                onClick={() => {
                  deleteTask(index);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
