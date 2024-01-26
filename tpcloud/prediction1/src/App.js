import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file


function App() {
  const initialFormData = {
    Area: 0,
    BHK: 0,
    Bathroom: 0,
    Furnishing: '',
    Locality: '',
    Parking: '',
    Status: '',
    Transaction: '',
    Type: '',
    Area_Yards: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === 0 || formData[key] === '') {
        setError(`Please fill in all fields`);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Error predicting price:', error.message);
      setError('Error predicting price. Please try again.');
    }
  };

  return (
    <div className="container">
        <h1>House Price Prediction</h1>
      
 <div>
 <form onSubmit={handleSubmit}>
        <label>
          Area:
          <input type="number" name="Area" value={formData.Area} onChange={handleChange} />
        </label>
        <br></br>

        {/* Add similar input fields for other parameters */}
        <label>
          BHK:
          <input type="number" name="BHK" value={formData.BHK} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Bathroom:
          <input type="number" name="Bathroom" value={formData.Bathroom} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Furnishing:
          <input type="text" name="Furnishing" value={formData.Furnishing} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Locality:
          <input type="text" name="Locality" value={formData.Locality} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Parking:
          <input type="text" name="Parking" value={formData.Parking} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Status:
          <input type="text" name="Status" value={formData.Status} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Transaction:
          <input type="text" name="Transaction" value={formData.Transaction} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Type:
          <input type="text" name="Type" value={formData.Type} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Area_Yards:
          <input type="number" name="Area_Yards" value={formData.Area_Yards} onChange={handleChange} />
        </label>
        <br></br>
        <button type="submit">Predict Price</button>
      </form>
 </div>
      

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction !== null && (
        <div>
          <h2>Predicted Price:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
