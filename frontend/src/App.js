import {React} from "react";
import {EmployeeFrom} from "./EmployeCreate/EmployeeForm";
import {EmployeeTable} from "./EmployeeTable/EmployeeTable";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
         <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Employee List</Link>
            </li>
            <li>
              <Link to="/createuser">Create Employee</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
          <Route path="/createuser" element={<EmployeeFrom />} />
        </Routes>
    
    </Router>
      {/* <EmployeeDirectory></EmployeeDirectory> */}
    </div>
  );
}

export default App;
