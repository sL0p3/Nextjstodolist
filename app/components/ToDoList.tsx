"use client"

import React, { useState , useEffect} from 'react'
import { Itodo } from '../interfacess'
import { useRouter } from 'next/navigation'
import Modal from './Modal';

const ToDoList: React.FC = () => {
    const [todos, setTodos] = useState<Itodo[]>([])
    const [editingTodo, setEditingTodo] = useState<Itodo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()
    const fetchTodo = ()=>{
        fetch('http://localhost:8000/todos')
        .then(res =>res.json()).then(data =>setTodos(data)).catch(err =>{
            console.log("Error",err)
        })
    }
    
    const handleDelete = (id : number)=>{
        fetch(`http://localhost:8000/todos/${id}`, {
            method : 'DELETE'
    })
    history.go(0);
  }

  useEffect(()=> {
    fetchTodo()
},[])

  const handleEdit  = (todo: Itodo) => {
   setEditingTodo(todo);
    setIsModalOpen(true);
  }

  const saveTodo = (newTodo: Itodo) => {
    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, body: newTodo.body } : todo
      );
      setTodos(updatedTodos);
      setIsModalOpen(false);

      fetch(`http://localhost:8000/todos/${editingTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: newTodo.body }),
      })
        .then(() => {
          console.log('Todo updated successfully');
        })
        .catch((error) => {
          console.log('Error updating todo:', error);
        });
    }
    history.go(0)
  };
  

  return (
<>
    <h1 className='text-2xl font-bold mb-5 text-center'>My To Do List</h1>
    
    <div>
       {todos.length > 0 ? (
        <ul>
          {todos.map(todo => (
            <div className='flex flex-col mb-5' key={todo.id}>
              <li >{todo.body}</li>
              <li className='flex gap-5 my-2'>
                <button onClick={()=> handleDelete(todo.id)} className='rounded-md p-2 text-slate-200 bg-red-700 '>Delete</button>
                <button onClick={()=> handleEdit(todo)} className='rounded-md p-2 text-slate-200 bg-yellow-500 '>Edit</button>
              </li>
             </div>
          ))}    
        </ul>
        ) : (
          <p>No todos found.</p>
      )}
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        saveTodo={saveTodo}
        editingTodo={editingTodo}
      />
    </div>
    </>   
    
  )
}

export default ToDoList