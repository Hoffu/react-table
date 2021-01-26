import React, { useEffect, useState } from 'react';
import './App.css';
import UsersTable from './components/UsersTable'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddUserForm from './components/AddUserForm'
import { url } from './constants/apiConnection'

const tableStyles = {
  width: "50%",
  margin: "1%"
}

function App() {  
  const [users, setUsers] = useState([])

  const getDataFromBack = async () => {
    const response = await fetch(url)
    if(response.ok) {
      setUsers(await response.json())
    } else {
      return null
    }
  }

  const deleteUser = async (id) => {
    const response = await fetch(url + id, { 
      method: 'DELETE'
    })
    if(response.ok) {
      getDataFromBack()
    }
  }

  const createUser = async (data) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body: JSON.stringify({data})
    })
    if(response.ok) {
      getDataFromBack()
    }
  }

  const updateUser = async (id, data) => {
    const response = await fetch(url + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body: JSON.stringify({data})
    })
    if(response.ok) {
      getDataFromBack()
    }
  }

  useEffect(() => {
    getDataFromBack()
  }, [])

  return (
    <div className="App">
      <Table style={tableStyles}>
        <UsersTable users={users} deleteUser={deleteUser} updateUser={updateUser} />
      </Table>
      <AddUserForm createUser={createUser} />
    </div>
  );
}

export default App;
