import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [users,setUsers]=useState([]);

   useEffect(()=>{

    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))

  },[])

  const handleAddUser=(event)=>{
    event.preventDefault()
    const name=event.target.name.value;
    const email=event.target.email.value;
    const user={name,email};
    //post
    fetch('http://localhost:5000/user',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(user),

    })
    .then((res)=> res.json())
    .then(data=>{
      const newUser=[...users, data];
      setUsers(newUser)
      console.log('success:',data)
    })
  }
  return (
    <div className="App">
      <h2>hellow:{users.length}</h2>
      <form onSubmit={handleAddUser}>
      <input type="text" name="name" id="" placeholder='Name' />
      <input type="email" name="email" id="" placeholder='Email' />
      <input type="submit" value="Add User" />
      </form>
      <ul>
      {
        users.map(user=> <li key={user.id}>Id:{user.id} Name:{user.name} Email:{user.email}</li>)
      }
      </ul>
    </div>
  );
}

export default App;
