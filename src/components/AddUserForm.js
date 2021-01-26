import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const style = {
    width: "30%",
    margin: "1%"
}

function AddUserForm(props) {
    const initialUser = {
        name: "",
        age: "",
        email: ""
    }
    const [user, setUser] = useState(initialUser)

    function handleInputChange(e) {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    function handleUserSubmit(e) {
        e.preventDefault()
        handleInputChange(e, props.createUser(user))
    }

    return (
        <Form id="TableForm" style={style}>
            <Form.Group>
                <Form.Control id="nameInput" size="text" type="text" value={user.name} name="name" placeholder="Name" onChange={handleInputChange} /><br />
                <Form.Control id="ageInput" size="text" type="text" value={user.age} name="age" placeholder="Age" onChange={handleInputChange} /><br />
                <Form.Control id="emailInput" size="text" type="text" value={user.email} name="email" placeholder="E-mail" onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUserSubmit}>Add user</Button>
        </Form>
    )
}

export default AddUserForm