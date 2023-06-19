import Image from 'next/image'
import NewToDo from './components/NewToDo'
import ToDoList from './components/ToDoList'

export default function Home() {
  return (
    <main className='max-w-5xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-5'>
        <h1 className='text-4xl font-bold my-7'>Nextjs To Do List Application</h1>
        <NewToDo /> 
      </div>
        <ToDoList />
    </main>
  )
}
