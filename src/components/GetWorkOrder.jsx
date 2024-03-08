import { useState, useEffect } from "react"
import axios from 'axios'


export default function CreateWorkOrder() {
  const [workOrder, setWorkOrder] = useState([])
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchWorkOrder = async () => {
      try {
        const response = await axios.get('http://localhost:8011/api/v1/workOrder', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWorkOrder(response.data.results);

      } catch (error) {
        console.error('Error fetching work orders:', error);
      }

    }
    fetchWorkOrder();
  },)

  return (
    <div>
      <h1>Pregled radnih naloga</h1>

      <div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>S.N</th>
              <th style={tableHeaderStyle}>Name Of Product</th>
              <th style={tableHeaderStyle}>Name of Material</th>
              <th style={tableHeaderStyle}>Amout Used</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.map((el) => (
              <tr key={el.nameOfProduct}>
                <td style={tableCellStyle}>{el.serialNumber}</td>
                <td style={tableCellStyle}>{el.nameOfProduct}</td>
                <td style={tableCellStyle}>
                  {el.nameOfMaterial.map((material, index) => (
                    <span key={index}>
                      {material.name}
                      {index < el.nameOfMaterial.length - 1 && ', '}
                    </span>
                  ))}
                </td>
                <td style={tableCellStyle}>
                  {el.amountUsed.map((amount, index) => (
                    <span key={index}>
                      {amount}
                      {index < el.amountUsed.length - 1 && ', '}
                    </span>
                  ))}
                </td>
                <td style={tableCellStyle}>
                  <a href={'http://localhost:8011/api/v1/downloadWorkOrder/' + el.serialNumber} target="_blank" ><button >Download</button></a>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
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