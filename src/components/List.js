import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function List() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Show 5 per page

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data.students))
      .catch(err => console.error("Error fetching students"));
  }, []);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDelete =(id)=>{
    axios.delete("http:///localhost:5000/studentdelete/${id}")
    .then(()=>(
     alert("deleted")
    ))
  }





  return (
    <div className='col-md-10 content'>
      <h1>Student List</h1>
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
          {currentStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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
      </nav>
    </div>
  );
}
