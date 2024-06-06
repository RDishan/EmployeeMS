import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaves = () => {
    const [leaves, setLeaves] = useState([]);
  
    useEffect(() => {
      const fetchLeaves = async () => {
        try {
          const response = await axios.get('http://localhost:3001/auth/leaves');
          if (response.data.Status) {
            setLeaves(response.data.Result);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchLeaves();
    }, []);
  
    const handleStatusChange = async (leaveId, newStatus) => {
      try {
        const response = await axios.put(`http://localhost:3001/auth/leaves/${leaveId}`, { status: newStatus });
        if (response.data.Status) {
          setLeaves(leaves.map(leave => leave.id === leaveId ? { ...leave, status: newStatus } : leave));
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h2>Manage Leave Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee_name}</td>
                <td>{leave.leave_type}</td>
                <td>{leave.reason}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === 'pending' && (
                    <div>
                      <button onClick={() => handleStatusChange(leave.id, 'approved')}>Approve</button>
                      <button onClick={() => handleStatusChange(leave.id, 'denied')}>Deny</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default Leaves