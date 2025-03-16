import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';




function Editclothes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clothes, setClothes] = useState({
        name: '',
        size: '',
        category_id: '',
        price: '',
        photo: null
    });
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

        axios.get(`http://localhost:3000/auth/clothes/${id}`)
            .then(result => {
                setClothes(prevState => ({
                    ...prevState,
                    name: result.data.Result[0].name,
                    price: result.data.Result[0].price,
                    size: result.data.Result[0].size,
                    category_id: result.data.Result[0].category_id,
                    photo: result.data.Result[0].photo || prevState.photo,
                }));
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', clothes.name);
        formData.append('size', clothes.size);
        formData.append('category_id', clothes.category_id);
        formData.append('price', clothes.price);
        if (clothes.photo && typeof clothes.photo !== "string") { 
            formData.append('photo', clothes.photo);
        }
        
        axios.put(`http://localhost:3000/auth/clothes/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            alert("Clothes updated successfully!");
            navigate('/dashboard/clothes');
        })
        .catch(error => {
            console.log("Error updating clothes:", error);
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '500px', width: '100%', border: 'none' }}>
                <h3 className="text-center text-primary fw-bold mb-4">Edit Clothes</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="clothesName" className="form-label fw-semibold">Name</label>
                        <input 
                            type="text" 
                            className="form-control rounded-3" 
                            name='name' 
                            value={clothes.name} 
                            id="name" 
                            placeholder="Enter name" 
                            onChange={(e) => setClothes({ ...clothes, name: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="size" className="form-label fw-semibold">Size</label>
                            <select 
                                className="form-select rounded-3" 
                                name="size" 
                                id="size" 
                                value={clothes.size}
                                onChange={(e) => setClothes({ ...clothes, size: e.target.value })} 
                                required
                            >
                                <option value="" disabled>Select Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="category" className="form-label fw-semibold">Category</label>
                            <select 
                                className="form-select rounded-3" 
                                name="category_id" 
                                id="category" 
                                value={clothes.category_id}
                                onChange={(e) => setClothes({ ...clothes, category_id: e.target.value })} 
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label fw-semibold">Price</label>
                        <input 
                            type="number" 
                            className="form-control rounded-3" 
                            name='price' 
                            id="price" 
                            value={clothes.price} 
                            placeholder="Enter price ($)" 
                            onChange={(e) => setClothes({ ...clothes, price: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo" className="form-label fw-semibold">Upload Photo</label>
                        <input 
                            type="file" 
                            className="form-control rounded-3" 
                            name='photo' 
                            id="photo" 
                            accept="image/*"
                            onChange={(e) => setClothes({ ...clothes, photo: e.target.files[0] })}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm px-4">
                            Edit Clothes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Editclothes;
