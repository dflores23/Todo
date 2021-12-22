// Import useState hook
import React, { useState } from "react";

//destructure out props, including router prop history
const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  ////////////////
  // The Form Data State
  ////////////////
  // Initiallize the form with the initialTodo state
  const [formData, setFormData] = useState(initialTodo);

  //////////////////////////
  // Functions
  //////////////////////////

  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to run when form is submitted
  const handleSubmission = (event) => {
    //prevent form refresh
    event.preventDefault();
    //pass formData to handleSubmit prop function
    handleSubmit(formData);
    //push user back to main page
    history.push("/");
  };

  const button = {
      backgroundColor: "orange",
      color: "black",
      margin: "1rem 3rem"
  }

  const input ={
      width: "100%",
      maxWidth: "89%",
      minWidth: "10%", 
      margin: "1rem 4rem"
  }

  // Our Form, an input for the subject and details fields and a submit button
  return (
    <form onSubmit={handleSubmission}>
      <input style={input}
        placeholder="Subject"
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
      />
      <input style={input}
        placeholder="Details"
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="details"
      />
      <input style={button} type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;