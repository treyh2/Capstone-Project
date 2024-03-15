import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Catalog() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    async function fetchShoes() {
      try {
        const { data } = await axios.get('/api/shoes');
        // Ensure that data is an array before setting the state
        if (Array.isArray(data)) {
          setShoes(data);
        } else {
          console.error('Invalid data format for shoes:', data);
        }
      } catch (error) {
        console.error('Error fetching shoes:', error);
        // Handle error state here, such as setting an empty array or showing an error message
        setShoes([]);
      }
    }

    fetchShoes();
  }, []);

console.log({ shoes })

  return (
    <div className="shoes-container">
      <h1>Shoes:</h1>
      {shoes.map(shoe => (
        <div key={shoe.id} className="shoe">
          <Link to={`/${shoe.name}`}>
            <img src={shoe.imageUrl} alt={shoe.name} />
            <h2>{shoe.name}</h2>
            <p>Price: ${shoe.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Catalog
