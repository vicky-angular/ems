import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchAgeChange = (e) => {
    setSearchAge(e.target.value);
  };

  const handleSearchDepartmentChange = (e) => {
    setSearchDepartment(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      (!searchTitle || employee.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (!searchAge || employee.age.toString().includes(searchAge)) &&
      (!searchDepartment || employee.department.toLowerCase().includes(searchDepartment.toLowerCase()))
    );
  });

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleSearchTitleChange}
        />

        <input
          type="text"
          placeholder="Search by age"
          value={searchAge}
          onChange={handleSearchAgeChange}
        />

        <input
          type="text"
          placeholder="Search by department"
          value={searchDepartment}
          onChange={handleSearchDepartmentChange}
        />

      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
         {filteredEmployees.length === 0 && <tr>
              <td colSpan="9" className="no-record">No record found</td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
};

export { EmployeeTable };
