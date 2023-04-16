import './App.css';
import { useState } from 'react';
import { RiCloseCircleLine } from "react-icons/ri";
import {AiTwotoneEdit} from 'react-icons/ai'


function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);  // It saves us to add extra one state for toggling

  const addTodo = () => {
    if (input.length === 0) {
      return;
    }
    if (data.includes(input)) {
      return
    }

    if (edit) {
      const f = data.map((el) => {
        if (el === edit) return input
        else return el
      })
      setEdit(false);
      setData(f);
    }
    else {
      setData([...data, input]);
      // edit -> It will check the indexing of prev todo and then replace with the same indexing
    }
    setInput("");
  }

  const deleteTodo = (item) => {
    const deleteTodoItem = data.filter((deleteItem) => {
      return item !== deleteItem;
    })
    setData(deleteTodoItem);
  }

  const editTodo = (item) => {
    setEdit(item)
    const editTodoItem = data.filter((editItem) => {
      return item === editItem
    })
    // editTodoItem -> It will return the editTodoItem
    setInput(editTodoItem);
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className='todo-form'>
        <input
          className='todo-input'
          placeholder='Add a todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='todo-button'
          onClick={addTodo}
        > {edit ? "Edit Todo" : "Add Todo"}</button>
      </div>
      <hr className='seperator' />
      {
        data.map((item) => {
          return (
            <div className='todo-row' key={item}>
              {item}
              <div className='iconsContainer'>
                <RiCloseCircleLine
                  style={{ marginRight: 5 }}
                  onClick={() => deleteTodo(item)}
                />
                <AiTwotoneEdit onClick={() => editTodo(item)} />
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
