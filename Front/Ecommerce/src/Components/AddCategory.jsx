
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 


function AddCategory() {
    const [category, setCategory] = useState()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/category')

                } else{
                    alert(result.data.Error)

                }

            })
            .catch(err => console.log(err));
    }
    

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-4">Add Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label"><strong>Category Name</strong></label>
            <input type="text" className="form-control" name='category' id="categoryName" placeholder="Enter category name" onChange={(e)=>setCategory(e.target.value)}required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg shadow-sm">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
