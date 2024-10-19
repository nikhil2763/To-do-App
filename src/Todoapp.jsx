import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

let getUserData = (email) => {
  const data = localStorage.getItem(email);
  return data ? JSON.parse(data) : [];
};



// localStorage.clear();

function Todoapp() {
  const email = JSON.parse(localStorage.getItem("loginuser"));
 
  let [todolist, settodolist] = useState(getUserData(email)); // Initialize with localStorage data
  let [taskToEdit, setTaskToEdit] = useState({ name: "", description: "" }); // Task being edited
  let [editIndex, setEditIndex] = useState(null); // Index of the task being edited
  let [searchQuery, setSearchQuery] = useState(""); // Search query
  


  useEffect(() => {
    if (email) {
      localStorage.setItem(email, JSON.stringify(todolist));
    }
  }, [todolist, email]);
  console.log(todolist)

  // Load tasks from local storage
  const navigate = useNavigate();

  // Handle form submission to add or update tasks
  let tododata = (Event) => {
    Event.preventDefault();
    let toname = Event.target.toname.value.trim(); // Task name
    let todescription = Event.target.todescription.value.trim(); // Task description
    // const result ={
    //   toname,todescription
    // }
    if (toname === "" || todescription === "") return; // Ensure both fields are filled

    if (editIndex !== null) {
      let updatedTasks = [...todolist];
      updatedTasks[editIndex] = { name: toname, description: todescription,email }; // Update the task at the edit index
      settodolist(updatedTasks);
      localStorage.setItem(email,JSON.stringify(updatedTasks))
      setEditIndex(null); // Reset the edit index
      setTaskToEdit({ name: "", description: "" }); // Clear the input fields
    } else {
      // Adding a new task
      let newTask = { name: toname, description: todescription ,email }; // Create task object
      if (
        !todolist.some(
          (task) => task.name === toname || task.description === todescription  
        )
      ) {
        // todolist.filter((data,i)=>data.email===email.email{
        //   settodolist([...todolist, newTask]);
        // })
        // Check if task already exists
         // Add the new task to the list
         settodolist([...todolist, newTask]);
        setTaskToEdit({ name: "", description: "" }); // Clear the input fields
      } else {
        alert("Task with this name or description already exists");
      }
    }
  };

  // Edit handler
  let handleEdit = (index) => {
    if (editIndex === index) {
      // Cancel editing if the same task is clicked again
      setEditIndex(null);
      setTaskToEdit({ name: "", description: "" }); // Clear the input fields
    } else {
      // Set the task to be edited in the input fields
      setTaskToEdit(todolist[index]);
      setEditIndex(index);
    }
  };

  // Filter tasks based on the search query
  let filteredTasks = todolist.filter((task) => {
    return (
      task.name && task.description.toLowerCase().includes(searchQuery)
      // task.description.toLowerCase().includes(searchQuery)
    );
  });

  // Map each task to a list item
  let listitem = filteredTasks.map((task, index) => {
    return (
      <Todolistitem
        task={task}
        key={index}
        indexnumber={index}
        handleEdit={handleEdit}
        editIndex={editIndex}
        settodolist={settodolist}
        todolist={todolist}
      />
    );
  });

  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loginuser')
    navigate("/login-page");
  };

  return (
    <div className="App w-full min-h-[100vh] h-full items-center md:items-center md:bg-slate-500 bg-gray-400">
      <div className="flex flex-wrap align-middle  w-[300px] m-auto sm:w-[550px] justify-center md:w-[1050px]">
        <h1 className="text-[30px] w-[600px] sm:text-[50px] md:text-center text-center pt-8 md:pt-16 font-['Roboto'] font-semibold">
          To-Do List App
        </h1>
        <div>
          <button
            onClick={handlelogout}
            className=" ml-[100px] text-xl sm:text-[30px] mt-2 border-2 border-black px-2 py-2 rounded-lg text-gray-600  md:mt-[80px]"
          >
            {" "}
            Logout
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="w-[300px] sm:w-[550px] justify-center md:w-[1050px] flex m-auto mt-10">
        <input
          className="search_query w-[300px] sm:w-[550px] md:w-[1050px] px-4 py-4 rounded-lg flex justify-center"
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>

      {/* Form to Add/Update Tasks */}
      <div className="w-[300px] sm:w-[550px] justify-center md:w-[1050px] m-auto mt-6 ">
        <form
          className="todo_form w-[300px] sm:w-[550px] justify-between md:w-[1050px] flex-wrap gap-[50px] flex "
          onSubmit={tododata}
        >
          <input
            className="name rounded-lg px-3 "
            type="text"
            name="toname"
            value={taskToEdit.name} // Controlled input for task name
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, name: e.target.value })
            }
            placeholder="Enter task name"
          />
          <br />
          &nbsp;
          <input
            className="description px-3 rounded-lg "
            type="text"
            name="todescription"
            value={taskToEdit.description} // Controlled input for task description
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, description: e.target.value })
            }
            placeholder="Enter task description"
          />
          <button className="to_button rounded-lg ml-3 px-2 py-2  border-2 border-black">
            {editIndex !== null ? "Update" : "Add"}
          </button>{" "}
          {/* Change button text */}
        </form>
      </div>

      {/* Task List */}
      <div className="outerdiv flex justify-center mt-10">
        <ul>{listitem}</ul>
      </div>
    </div>
  );
}

export default Todoapp;

// List Item Component
function Todolistitem({
  task,
  indexnumber,
  todolist,
  settodolist,
  handleEdit,
  editIndex,
}) {
  // Delete a task
  let deleteRow = () => {
    let finaldata = todolist.filter((_, i) => i !== indexnumber);
    settodolist(finaldata);
  };

  return (
    <li className=" w-[300px] sm:w-[550px] justify-center md:w-[1050px] border-2 border-black rounded-lg px-5 py-3">
      <div className="flex justify-between align-middle">
        <div className="flex-col">
          <div className="flex gap-1 text-xl">
            {indexnumber + 1}. title :<strong>{task.name}</strong>
          </div>
          <div className="description text-xl ml-5">
            description: {task.description}
          </div>{" "}
        </div>
        {/* Display both name and description */}
        <div className="btndiv sm:flex      sm:gap-5">
          <div className=" ">
            <button
              className="btn1 border-2 border-black rounded-md mb-2 px-5 py-1"
              onClick={deleteRow}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              className="btn2 border-2 border-black rounded-md px-5 py-1"
              onClick={() => handleEdit(indexnumber)}
            >
              {editIndex === indexnumber ? "Cancel" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
