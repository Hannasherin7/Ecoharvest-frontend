import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

const OwnProfile = () => {
  const location = useLocation();
  const { user } = location.state || {};
  

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
  });

  useEffect(() => {
    // Simulate fetching user data
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        expertise: user.expertise,
        experience: user.experience,
      });
    } else {
      // Handle case when user data is not available
      console.error('No user data available');
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // TODO: Add save logic, e.g., sending the updated data to the server
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
      <Card sx={{ maxWidth: 400, margin: '0 auto', backgroundColor: '#1e1e1e', color: 'white' }}>
        <CardMedia
          component="img"
          height="200"
          image="/path-to-image.jpg" // Add a profile picture here if needed
          alt="User Profile"
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          {isEditing ? (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Area of Expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h6">Name: {formData.name}</Typography>
              <Typography variant="body1">Email: {formData.email}</Typography>
              <Typography variant="body1">Area of Expertise: {formData.expertise}</Typography>
              <Typography variant="body1">Experience: {formData.experience} years</Typography>
              <Button variant="outlined" color="secondary" onClick={handleEditClick} sx={{ marginTop: '1rem' }}>
                Edit Profile
              </Button>
              <Button variant="outlined" color="secondary" sx={{ marginTop: '1rem' }}>
                View Appointments
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default OwnProfile;
