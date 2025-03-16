import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Clothes() {
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


    const [clothes, setclothes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:3000/auth/clothes')
            .then(result => {
                if (result.data.Status) {
                    setclothes(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/delete_clothes/${id}`)
            .then(result => {
                if (result.data.Status) {

                    setclothes(prevClothes => prevClothes.filter(c => c.id !== id));


                    setTimeout(() => {
                        navigate('/dashboard/clothes');
                    }, 500);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(error => console.error("Delete request failed:", error));
    };

    return (

        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center text-primary fw-bold">Clothes List</h3>
                <hr className="mb-4" />

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <Link to="/dashboard/add_clothes" className="btn btn-primary shadow">
                        <i className="bi bi-plus-circle me-2"></i> Add Clothes
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th className="py-2"> Name</th>
                                    <th className="py-2"> Photo </th>
                                    <th className="py-2"> Size</th>
                                    <th className="py-2"> Price </th>
                                    <th className="py-2"> Category </th>
                                    <th className="py-2"> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clothes.length > 0 ? (
                                    clothes.map((c, index) => (
                                        <tr key={index} className="table-light">
                                            <td className="py-2">{c.name}</td>
                                            <td className="py-2"><img src={`http://localhost:3000/images/` + c.photo} alt="" width="50" height="50" /></td>
                                            <td className="py-2">{c.size}</td>
                                            <td className="py-2">{c.price}</td>
                                            {/* <td className="py-2">{c.category_id}</td> */}
                                            <td className="py-2">
                                                {category.find(cat => cat.id === c.category_id)?.name || "Unknown"}
                                            </td>

                                            <td>
                                                <Link to={`/dashboard/edit_clothes/` + c.id} className="btn btn-info btn-sm me-2"> Edit </Link>
                                                <button className="btn btn-warning btn-sm" onClick={() => handleDelete(c.id)}> Delete </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="1" className="text-danger fw-bold">No clothes available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>



    )
}

export default Clothes
