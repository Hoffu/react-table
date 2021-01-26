import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const style = {
    styleForOthers: {
        border: "1px solid gray",
        width: "20%"
    },
    styleForButtonTd: {
        border: "0px",
        backgroundColor: "white",
        float: "left"
    },
    styleForDeleteButton: {
        backgroundColor: "darkRed",
        border: "0px",
        margin: "3px"
    },
    styleForEditButton: {
        backgroundColor: "darkGreen",
        border: "0px",
        margin: "3px"
    }
}

function UsersTable(props) {
    const initialUser = {
        name: "",
        age: "",
        email: ""
    }
    const [editing, setEditing] = useState(false)
    const [user, setUser] = useState(initialUser)
    const [editIndex, setEditIndex] = useState()
    function handleInputChange(e) {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    function handleUserSubmit(e, id) {
        setEditing(!editing)
        e.preventDefault()
        handleInputChange(e, props.updateUser(id, user))
    }

    return(
        <>
            <thead>
                <tr>
                    <td style={style.styleForOthers}>Name</td>
                    <td style={style.styleForOthers}>Age</td>
                    <td style={style.styleForOthers}>E-mail</td>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td style={style.styleForOthers}>{editing && index===editIndex ? (<Form.Control size="text" type="text" defaultValue={user.data?.name} name="name" placeholder="Name" onChange={handleInputChange} />) : (user.data?.name)}</td>
                            <td style={style.styleForOthers}>{editing && index===editIndex ? (<Form.Control size="text" type="text" defaultValue={user.data?.age} name="age" placeholder="Age" onChange={handleInputChange} />) : (user.data?.age)}</td>
                            <td style={style.styleForOthers}>{editing && index===editIndex ? (<Form.Control size="text" type="text" defaultValue={user.data?.email} name="email" placeholder="E-mail" onChange={handleInputChange} />) : (user.data?.email)}</td>
                            <td style={style.styleForButtonTd}>
                                <Button onClick={() => {
                                    props.deleteUser(user._id)
                                    setEditing(false)
                                }} style={style.styleForDeleteButton}>X</Button>
                                {editing && index===editIndex ? (<Button onClick={(e) => {handleUserSubmit(e, user._id)}} style={style.styleForEditButton}>Save</Button>) : 
                                !editing && (<Button onClick={() => {
                                        setEditing(!editing)
                                        setUser(user.data)
                                        setEditIndex(index)
                                    }} style={style.styleForEditButton}>Edit</Button>)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </>
    )
}

export default UsersTable