import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddCategory.css'; // Assuming you save the CSS as AddCategory.css

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();    
    axios.post('http://localhost:3001/auth/add_category', { category })
      .then(result => {
        if(result.data.Status){
            navigate('/dashboard/category');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="custom-form p-3 rounded w-25 border">
        <h2>Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">
              <strong>Department:</strong>
            </label>
            <input
              type="text"
              name='category'
              placeholder="Enter the Department Name"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
              value={category}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">
            Add New Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;