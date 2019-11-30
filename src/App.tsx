import React, { Fragment, useState } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string
  complete: boolean

}

const App: React.FC = () => {

  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([])

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index)
    setTodos(newTodos)

  }
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text: text, complete: false }];

    setTodos(newTodos)

  }
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  return (
    <Fragment>
      <h1>TodoList</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} required />
        <button type='submit'>Add Todo</button>
        <section>
          {todos.map((todo: ITodo, index: number) => {

            return <Fragment key={index}>
              <div style={{ textDecoration: todo.complete ? 'line-through' : 'none', }}>{todo.text}</div>
              <button type='button' onClick={() =>
                completeTodo(index)}>{todo.complete ? 'done' : 'not done'}</button>
              <button type='button' onClick={() => removeTodo(index)}>remove</button>
            </Fragment>
          })}
        </section>
      </form>
    </Fragment>
  );
}

export default App;
