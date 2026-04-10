import React, { useEffect, useState } from "react"

const Todo = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState("")

  const apiUrl = "http://localhost:8000"

  // ➕ ADD TODO
  const handleAdd = () => {
    if (!title || !description) return

    fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })
      .then(() => {
        setTitle("")
        setDescription("")
        getTodos()
        setMessage("Todo added successfully")
        setTimeout(() => setMessage(""), 2000)
      })
  }

  // ✏️ UPDATE TODO
  const handleUpdate = () => {
    fetch(`${apiUrl}/todos/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })
      .then(() => {
        setEditId(null)
        setTitle("")
        setDescription("")
        getTodos()
        setMessage("Todo updated successfully")
        setTimeout(() => setMessage(""), 2000)
      })
  }

  // 📄 GET TODOS
  const getTodos = () => {
    fetch(`${apiUrl}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
  }

  // ✏️ EDIT MODE
  const handleEdit = (todo) => {
    setEditId(todo._id)
    setTitle(todo.title)
    setDescription(todo.description)
  }

  // 🗑 DELETE TODO
  const handleDelete = (id) => {
    fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" })
      .then(() => getTodos())
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="container mt-3">

      {/* HEADER */}
      <div className="bg-success text-light text-center p-3 rounded">
        <h4 className="mb-0">ToDo Project with MERN stack</h4>
      </div>

      {/* ADD / EDIT */}
      <div className="mt-4">
        <h5>Add Item</h5>

        {message && <p className="text-success">{message}</p>}

        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-4 d-flex gap-2">
            {!editId && (
              <button className="btn btn-dark w-100" onClick={handleAdd}>
                Submit
              </button>
            )}

            {editId && (
              <>
                <button className="btn btn-primary w-50" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => {
                    setEditId(null)
                    setTitle("")
                    setDescription("")
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="mt-4">
        <h5>Tasks</h5>

        <ul className="list-group">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center bg-info text-dark mb-2 rounded"
            >
              <div>
                <strong>{todo.title}</strong>
                <div className="small">{todo.description}</div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Todo