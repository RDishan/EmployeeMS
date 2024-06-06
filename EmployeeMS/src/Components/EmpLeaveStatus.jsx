import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmpLeaveStatus = () => {
   
      const { employeeId } = useParams();
      const [leaves, setLeaves] = useState([]);
    
      useEffect(() => {
        const fetchLeaves = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/employee/${employeeId}/leaves`);
            if (response.data.Status) {
              setLeaves(response.data.Result);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchLeaves();
      }, [employeeId]);
    
      return (
        <div>
          <h2>Leave Status</h2>
          <table>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leave_type}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    

export default EmpLeaveStatus