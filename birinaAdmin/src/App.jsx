import React, { useState } from 'react';
import './App.css';

const initialData = {
  name: '',
  email: '',
  message: '',
  location: '',
};

const App = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
    location: '',
  });

  

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Fetch the user's geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
          setData({ ...data, location });

          // Post the data to the API with location
          fetch('https://v1.nocodeapi.com/bristin/google_sheets/xhSjjCqjXeHrUkqD?tabId=sheet1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([[data.name, data.email, data.message, location, new Date().toLocaleString()]]),
          });

          setData(initialData);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };

  const { name, email, message } = data;
  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
       <div>
       <label style={labelStyle}>Name of Artisan:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Artisan Name"
          style={inputStyle}
        />
        </div> 

        <div>
        <label style={labelStyle}>Cluster Number:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your Email"
          style={inputStyle}
        />
        </div>
        <div>
        <label style={labelStyle}>Type of Gamusa:</label>
            <select
              name="message"
              value={message}
              onChange={handleChange}
              style={{ marginBottom: '10px', padding: '5px' }}
            >
              <option value="Type of gamosa" disabled selected hidden>
                Type of gamosa
              </option>
              <option value="Uka gamusa">Uka gamusa</option>
              <option value="Phulam gamusa">Phulam gamusa</option>
              <option value="Bihuwan gamosa">Bihuwan gamosa</option>
              <option value="Tiyoni gamosa">Tiyoni gamosa</option>
              <option value="Pani gamosa">Pani gamosa</option>
              <option value="Aanakota gamosa">Aanakota gamosa</option>
              <option value="Telosh gamosa">Telosh gamosa</option>
              <option value="Dora Boronor">Dora Boronor</option>
            </select>
      </div>
        <button type="submit" style={inputStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;