import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewUsers = () => {

    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        loadUser()
    }, [])

    const loadUser = async () => {
        try {
            const res = await axios.get("https://userapp180.onrender.com/users");
            setUsers(res.data);
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async (email)=> {
        try {
            await axios.delete(`https://userapp180.onrender.com/removeuser/${email}`);
            alert("user deleted successfully")
            loadUser();
        } catch (err) {
            setError(err.message)
        }
    }

    const handleEdit = async (email) => {
        try {
            const name = prompt("Enter the name: ")
            const password = prompt("Enter the password: ")
            const role = prompt("Enter the role: ")
            const newemail = prompt("Enter the email: ")

            await axios.put(`https://userapp180.onrender.com/updateuser/${email}`, {name, password, role, newemail});
            alert("user updated successfully")
            loadUser();
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='content'>
        <h1>List of users</h1>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {error && <tr><td colSpan='5'>error</td></tr> }
                {users.map((user, index)=> (
                    <tr>
                        <td>{++index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className='btn btn-success' onClick={()=>handleEdit(user.email)}>Edit</button> &nbsp;
                            <button className='btn btn-danger' onClick={()=>handleDelete(user.email)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewUsers