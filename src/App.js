// Import our components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// import React Hooks
import { useState, useEffect } from "react";

// Import React Router Components
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  // ______________
  // Style Objects
  // ______________

  const h1 = {
    textAlign: "center",
    margin: "30px",
    color: "gray"
  };

  const button = {
    backgroundColor: "orange",
    display: "block",
    margin: "3rem auto",
    color: "black"
  }
  
  // ________________________
  // State & Other Variables
  // ________________________

  //api url
  const url = "https://df-todos-backend.herokuapp.com/todos/";

  // state to hold list of todos
  const [posts, setPosts] = useState([]);

  // an object that represents a null todo
  const nullTodo = {
    subject: "",
    details: "",
  };

  // const state to hold todo to edit 
  const [targetTodo, setTargetTodo] = useState(nullTodo);

  // ___________
  // Functions
  // ___________
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  // Function to add todo from form data
  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    // get updated list of todos
    getTodos();
  };


  // Function to select todo to edit
  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    props.history.push("/edit");
  }

  // Function to edit todo on form submission
  const updateTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
    getTodos();
  }

  // Function to edit todo on form submission
  const deleteTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "delete",
    });

    // get updated list of todos
    getTodos();
    props.history.push("/");
  };

  // ___________
  // useEffects
  // ___________
  // make the api call when the component loads only the first time
  useEffect(() => {
    getTodos()
  }, [])
  // _____________
  // Returned JSX
  // _____________
  return (
    <div className="App">
      <Link to="/"><h1 style={h1}>My To Do List</h1></Link>
      <Link to="/new"><button style={button}>Create New To do</button></Link>
      <Switch>
        {/* INDEX PAGE */}
        <Route
          exact
          path="/"
          render={(rp) => {
            return <AllPosts {...rp} posts={posts} />;
          }}
        />
        {/* SHOW PAGE */}
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps}
              posts={posts}
              edit={getTargetTodo}
              deleteTodo={deleteTodo} />
          )}
        />
        {/* NEW AND EDIT FORM PAGES */}
        <Route
          path="/new"
          render={(rp) => (
            <Form 
              {...rp}
              initialTodo={nullTodo}
              handleSubmit={addTodos}
              buttonLabel="create a to do"
            />
          )}
        />

        <Route
          path="/edit"
          render={(rp) => {
            return <Form {...rp}
              initialTodo={targetTodo}
              handleSubmit={updateTodo}
              buttonLabel ="update"
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
