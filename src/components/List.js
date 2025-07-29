import React, { useEffect, useState } from 'react';
import "./List.js";
import axios from 'axios';


export default function List() {
  const [users, setUsers] = useState([]);

  const [studentsPerPage] = useState(10); // Show 5 per page

  const fetchUsers = () => {
    axios.get("http://localhost:5000/students")
      .then(res => setUsers(res.data.students))
      .catch(err => console.error("Error fetching users:",err));
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const handleDelete =(id)=>{
    axios.delete("http://localhost:5000/studentdelete/${id}")
    .then(()=>{
     alert("deleted");
     fetchUsers();
  })
    .catch(err => console.error("Error deleting user:", err));
  };


  return (
    <div className='col-md-10 content'>
      <h1>Student New List </h1>
      <table className='table table-bordered table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => handleClick(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li key={idx} className={`page-item ${currentPage === idx + 1 && 'active'}`}>
              <button className="page-link" onClick={() => handleClick(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => handleClick(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};
