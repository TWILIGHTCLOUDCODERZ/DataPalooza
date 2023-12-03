import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemSelection = ({ apiKey, selectedBoards, onNext }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const apiUrl = 'https://api.monday.com/v2';
      const queryItems = `
        query GetItemsInBoards($boardIds: [Int!]!) {
          boards(ids: $boardIds) {
            items {
              id
              name
            }
          }
        }
      `;

      const variablesItems = { boardIds: selectedBoards };
      
      try {
        const response = await axios.post(apiUrl, { query: queryItems, variables: variablesItems }, { headers: { 'Authorization': apiKey } });
        if ('data' in response && 'data' in response.data && 'boards' in response.data.data && response.data.data.boards.length > 0) {
          setItems(response.data.data.boards[0].items);
        }
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, [apiKey, selectedBoards]);

  const handleNext = () => {
    // Validate selectedItems if needed
    onNext(5, selectedItems);
  };

  return (
    <div>
      <label>
        Select items:
        <select multiple value={selectedItems} onChange={(e) => setSelectedItems(Array.from(e.target.selectedOptions, option => option.value))}>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </label>
      <button onClick={handleNext} disabled={selectedItems.length === 0}>Next</button>
    </div>
  );
};

export default ItemSelection;
