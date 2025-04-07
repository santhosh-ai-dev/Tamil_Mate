import { useState } from "react"
import "./styles.css"

export default function App(){
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e){
    e.preventDefault()

    setTodos((currentTodos) => {
      return [...currentTodos, {id:crypto.randomUUID(), title:newItem, completed:false},]
    })

    setNewItem("")
  }

  console.log(todos)

  return (
  <>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input value={newItem} onChange={e=> setNewItem(e.target.value)} type="text" if="item" />
      <button className="btm">Add</button>
    </div>
  </form>
  <h1 className="header">Todo list</h1>
    <ul className="list">
      {todos.map(todo=>{
        return (
          <li key={todo.id}>
            <label >
              <input type="checkbox" checked={todo.campleted}/>
              {todo.title}
              <button className="btn btn-danger">Delete</button>
            </label>
          </li>
        )
      })}

    </ul>
  </>
  )
}