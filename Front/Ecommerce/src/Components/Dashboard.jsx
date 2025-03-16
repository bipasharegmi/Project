import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css'; 
import axios from 'axios';



function Dashboard() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;


    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
        .then (result => {
            if(result.data.Status){
                navigate('/')

            }
        })
    }
  return (
    <div className=" dashboard-container d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-light p-4 min-vh-100">
        <h3 className=" text-center mb-4">Admin Dashboard</h3>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-light sidebar-link">
              <i className="bi bi-house-door-fill me-3"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/clothes" className="nav-link text-light sidebar-link">
              <i className="bi bi-bag-fill me-3"></i> Manage Clothes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/category" className="nav-link text-light sidebar-link">
              <i className="bi bi-tags-fill me-3"></i> Category
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/dashboard/profile" className="nav-link text-light sidebar-link">
              <i className="bi bi-person-fill me-3"></i> Profile
            </Link>
          </li> */}
          <li className="nav-item" onClick={handleLogout}>
            <Link to="/dashboard/logout" className="nav-link text-light sidebar-link">
              <i className="bi bi-box-arrow-left me-3"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className=" main-content container-fluid d-flex justify-content-center align-items-start p-4">
        <div className="text-center">
          <h4>Welcome to the Dashboard</h4>
          <div>
            
            <Outlet/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
