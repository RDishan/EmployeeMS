import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Category = () => {
  const [category, setCategory] = useState([])
  const [categoryData, setCategoryData] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3001/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/auth/categories_with_employee_count')
      .then(result => {
        if (result.data.Status) {
          setCategoryData(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])
  
  return (
    <div className="px-5 mt-3" style={{ fontSize: '1.2rem', color: '#000' }}>
      <div className="d-flex justify-content-center">
        <h3>Department List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Department
      </Link>
      <div className="mt-3">
        <table className="table table-striped" >
          <thead>
            <tr style={{ backgroundColor: '#228B22', color: '#fff' }}>
              <th >ID</th>
              <th>Name of Department</th>
              <th>Number of Employees</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.employee_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category
