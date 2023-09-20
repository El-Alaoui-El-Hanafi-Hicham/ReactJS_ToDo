import React, { useState } from 'react'
import { useAddTaskMutation } from './TaskSlice';

function AddTaskComp() {
    const [TaskForm, setTaskForm] = useState({
        id: "",
        title: "",
        description: "",
        isDone: false,
        date: "",
      });

      const [addTask, { isLoading: isLoading2, isSuccess: AddTaskIsSuccess }] =
      useAddTaskMutation();    
      
      
  function FillTaskInfo(e) {
    setTaskForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddTask(e) {
    e.preventDefault();
    setTaskForm((prev) => ({ ...prev, date: new Date().toISOString() }));
    let {title,description} =TaskForm;
    if(title!="" || description!=""){

        await addTask(TaskForm);
        if (AddTaskIsSuccess) {
            setTaskForm((prev) => ({ ...prev, title: "", description: "" }));
        }
    } 
  }
  return (
    <div>
        HeLLO
{JSON.stringify(TaskForm)}
      <form onSubmit={(event) => handleAddTask(event)}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={(e) => FillTaskInfo(e)}
            id="exampleInputTitle"
            aria-describedby="TitleHelp"
          />
          <div id="TitleHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            onChange={(e) => FillTaskInfo(e)}
            id="exampleInputDescription"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

    </div>
  )
}

export default AddTaskComp