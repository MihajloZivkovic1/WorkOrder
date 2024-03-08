import { Form, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function UpdateCardboard() {
  const { id } = useParams();
  const [cardboard, setCardboard] = useState({
    name: '',
    width: '',
    height: '',
    quantity: '',
    wave: '',
    description: '',
  });
  const token = localStorage.getItem('token')



  const handleInputChange = (event) => {
    setCardboard({
      ...cardboard,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:8011/api/v1/flatCardboard/${id}`, cardboard, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("succesfully updated ")
      window.location = '/cardboards'
    } catch (error) {
      console.error('Error updating cardboard:', error);
    }
  };
  function redirectBack() {
    window.location = '/cardboards'
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} method="patch" id="contact-form">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={cardboard.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Width</span>
          <input
            type="number" // Change type to number
            name="width"
            value={cardboard.width}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Height</span>
          <input
            type="number" // Change type to number
            name="height"
            value={cardboard.height}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Quantity</span>
          <input
            type="number" // Change type to number
            name="quantity"
            value={cardboard.quantity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Wave</span>
          <input
            type="text"
            name="wave"
            value={cardboard.wave}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            value={cardboard.description}
            onChange={handleInputChange}
            rows={6}
          />
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button" onClick={redirectBack}>Cancel</button>
        </p>
      </Form>
    </div>
  )
}



