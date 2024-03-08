import { useState, useEffect } from "react";
import axios from "axios";


export default function CreateWorkOrder() {
  const [formData, setFormData] = useState({
    serialNumber: '',
    nameOfProduct: '',
    nameOfMaterials: [],
    amountsUsed: [],
  });
  const [cardboards, setCardboards] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchCardboards = async () => {
      try {
        const response = await axios.get('http://localhost:8011/api/v1/flatCardboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCardboards(response.data.results);
      } catch (error) {
        console.error('Error fetching cardboards:', error);
      }
    };
    fetchCardboards();
  },);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (name === 'nameOfMaterial') {

      const selectedCardboard = cardboards.find(cardboard => cardboard._id === value);


      if (selectedCardboard) {
        newFormData.nameOfMaterials[index] = selectedCardboard._id;
      }
    } else if (name === 'amountUsed') {
      newFormData.amountsUsed[index] = value;
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      nameOfMaterials: [...formData.nameOfMaterials, ''],
      amountsUsed: [...formData.amountsUsed, ''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8011/api/v1/workOrder', {
        serialNumber: formData.serialNumber,
        nameOfProduct: formData.nameOfProduct,
        nameOfMaterial: formData.nameOfMaterials,
        amountUsed: formData.amountsUsed,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },

        });
      console.log('Work order created:', response.data);
      // Optionally, you can reset the form after submission
      setFormData({
        serialNumber: '',
        nameOfProduct: '',
        nameOfMaterials: [],
        amountsUsed: [],
      });
    } catch (error) {
      console.error('Error creating work order:', error);
    }
  };

  return (
    <div>
      <h2>Create Work Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Serial Number:
          <input type="text" name="serialNumber" value={formData.serialNumber} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Name of Product:
          <input type="text" name="nameOfProduct" value={formData.nameOfProduct} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        {formData.nameOfMaterials.map((_, index) => (
          <div key={index}>
            <label>
              Name of Material:
              <select name="nameOfMaterial" value={formData.nameOfMaterials[index]} onChange={(e) => handleChange(e, index)}>
                <option value="">Select Material</option>
                {cardboards.map((cardboard) => (
                  <option key={cardboard._id} value={cardboard._id}>{cardboard.name}</option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Amount Used:
              <input type="text" name="amountUsed" value={formData.amountsUsed[index]} onChange={(e) => handleChange(e, index)} />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddMaterial}>Add Material</button>
        <br />
        <button type="submit">Create Work Order</button>
      </form>
    </div>
  );
}