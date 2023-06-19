"use client"
import React, {useState } from 'react'

const NewToDo = () => {

    const [body, setbody] = useState('')
    // const [todos, setTodos] = useState<Itodo[]>([])
    
    const handleSubmit = (e:any)=>{
        // e.preventDefault()
        const todo = {body}
        fetch('http://localhost:8000/todos', {
            method : 'POST',
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(todo)
    })
    }

  return (
    <div className='text-center'>
        <form className='flex flex-col gap-4'>
            <textarea value={body} onChange={e => setbody(e.target.value)} placeholder='Enter your ToDo' className='w-full border border-sky-500 p-10 text-black'></textarea>
            <button onClick={handleSubmit} className='w-4xl text-slate-800 bg-pink-500 self-center hover:text-white rounded-md p-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 cursor-pointer' >Add New Task</button>
        </form>
    </div>
  )
}

export default NewToDo