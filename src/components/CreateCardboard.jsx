import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-router-dom';

export default function CreateCardboard() {
  const [formData, setFormData] = useState({
    name: '',
    width: '',
    height: '',
    quantity: '',
    wave: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For number fields, parse the value as a number
    const parsedValue = name === 'quantity' || name === 'width' || name === 'height' ? parseFloat(value) : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8011/api/v1/flatCardboard', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);

      setFormData({
        name: '',
        width: '',
        height: '',
        quantity: '',
        wave: '',
        description: ''
      });
    } catch (error) {
      console.error('Error creating cardboard:', error);
    }
  };


  return (
    <div>
      <Form onSubmit={handleSubmit} method="post" id="contact-form">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Width</span>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Height</span>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Quantity</span>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Wave</span>
          <input
            type="text"
            name="wave"
            value={formData.wave}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
          />
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    </div>
  );
}
