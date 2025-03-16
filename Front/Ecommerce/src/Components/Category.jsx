import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Category() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center text-primary fw-bold">Category List</h3>
                <hr className="mb-4"/>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    
                    <Link to="/dashboard/add_category" className="btn btn-primary shadow">
                        <i className="bi bi-plus-circle me-2"></i> Add Category
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th className="py-2">Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.length > 0 ? (
                                category.map((c, index) => (
                                    <tr key={index} className="table-light">
                                        <td className="py-2">{c.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="1" className="text-danger fw-bold">No categories available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Category;
