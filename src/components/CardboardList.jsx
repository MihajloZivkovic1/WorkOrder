import { useState, useEffect } from 'react'
import axios from 'axios'


export default function CardboardList() {
  const [cardboards, setCardboards] = useState([]);
  const token = localStorage.getItem('token');
  // const navigate = useNavigate();

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
  },)

  const handleUpdate = async (id) => {
    window.location = `/updateCardboard/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8011/api/v1/flatCardboard/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCardboards(cardboards.filter(cardboard => cardboard._id !== id));
    } catch (error) {
      console.error('Error deleting cardboard:', error);
    }
  };


  return (
    <div>
      <h1>Tabela Repromaterijala</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Naziv</th>
            <th style={tableHeaderStyle}>Sirina</th>
            <th style={tableHeaderStyle}>Duzina</th>
            <th style={tableHeaderStyle}>Kolicina</th>
            <th style={tableHeaderStyle}>Opis</th>
            <th style={tableHeaderStyle}>Obrisi/Azuriraj</th>
          </tr>
        </thead>
        <tbody>
          {cardboards.map((cardboard) => (
            <tr key={cardboard._id}>
              <td style={tableCellStyle}>{cardboard.name}</td>
              <td style={tableCellStyle}>{cardboard.width}</td>
              <td style={tableCellStyle}>{cardboard.height}</td>
              <td style={tableCellStyle}>{cardboard.quantity}</td>
              <td style={tableCellStyle}>{cardboard.description}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleDelete(cardboard._id)}>Obrisi</button>
                <button onClick={() => handleUpdate(cardboard._id)}>Azuriraj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

const tableHeaderStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

const tableCellStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

