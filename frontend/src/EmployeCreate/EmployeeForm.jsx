import {React, useState} from "react";
import './EmployeeFrom.css';  // Import the CSS file
import axios from "axios";
const EmployeeFrom = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
        currentStatus: false
      });
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };
    
      const handleSubmit = async (e) => {
        console.log('the data --', formData)
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/createuser', formData);
          console.log('Employee created:', response.data);
          setFormData({
            firstName: '',
            lastName: '',
            age: '',
            dateOfJoining: '',
            title: '',
            department: '',
            employeeType: '',
            currentStatus: false
          });
          window.location.reload();
        } catch (error) {
          console.error('Error creating employee:', error);
        }
      };
    
    return (
        <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Create Employee</h2>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </label>
      <label>
        Date of Joining:
        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Department:
        <input type="text" name="department" value={formData.department} onChange={handleChange} required />
      </label>
      <label>
        Employee Type:
        <input type="text" name="employeeType" value={formData.employeeType} onChange={handleChange} required />
      </label>
      <label>
        Current Status:
        <input type="checkbox" name="currentStatus" checked={formData.currentStatus} onChange={handleChange} />
      </label>
      <button type="submit">Create Employee</button>
    </form>
    )
}
export {EmployeeFrom}