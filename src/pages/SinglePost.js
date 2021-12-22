import React from "react"
import {Link} from "react-router-dom"

const SinglePost = ({posts, match, edit, deleteTodo}) => {

    // grab the id from params
    const id = parseInt(match.params.id)
    // find the single post from the posts array
    const post = posts.find((post) => post.id === id )

    // _______________
    // Style objects
    // _______________
    const div = {
        textAlign:"center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }
    const button = {
        backgroundColor: "orange",
        margin: ".5rem",
        color: "black"
    }

    
    

    return <div style={div}>
        <h1>{post?.subject}</h1>
        <h2>{post?.details}</h2>
        <button style={button} onClick={(event) => edit(post)}>Edit</button>
        <button style={button} onClick={(event) => deleteTodo(post)}>Delete</button>
        <Link to="/"><button style={button} >Go back</button></Link>
    </div>
}

export default SinglePost
