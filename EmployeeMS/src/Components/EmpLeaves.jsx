import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, TextareaAutosize, Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const EmpLeaves = () => {
  const { id } = useParams(); 

  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/employee/empdashboard/${id}/request_leave`, {
        leave_type: leaveType,
        reason,
        start_date: startDate,
        end_date: endDate,
      });
      if (response.data.Status) {
        setStatusMessage('Leave request submitted successfully!');
      } else {
        setStatusMessage('Failed to submit leave request.');
      }
    } catch (error) {
      console.error('Error:', error.response); 
      setStatusMessage('An error occurred.');
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Request Leave</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Leave Type"
          variant="outlined"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          margin="normal"
        />
        <TextareaAutosize
          rowsMin={3}
          placeholder="Reason for Leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" style={{ marginTop: '20px', backgroundColor: '#228B22', color: 'white' }}>Submit Request</Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {statusMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmpLeaves;
