import React, { useState } from 'react';
import axios from 'axios';

const StatusChange = ({ apiKey, selectedItems }) => {
  const [changeStatus, setChangeStatus] = useState(false);

  const handleChangeStatus = async () => {
    if (changeStatus) {
      const apiUrl = 'https://api.monday.com/v2';
      const mutationChangeStatus = `
        mutation ChangeItemStatus($itemIds: [Int!]!, $statusValue: String!) {
          change_simple_column_value(item_ids: $itemIds, column_id: "status", value: $statusValue) {
            id
          }
        }
      `;

      const variablesChangeStatus = { itemIds: selectedItems, statusValue: 'Completed' };

      try {
        const response = await axios.post(apiUrl, { query: mutationChangeStatus, variables: variablesChangeStatus }, { headers: { 'Authorization': apiKey } });
        const success = response && response.data && 'data' in response.data && 'change_simple_column_value' in response.data.data;
        
        if (success) {
          alert('Status of selected items changed to "Completed".');
        } else {
          alert('Failed to change the status.');
        }
      } catch (error) {
        console.error('Error changing status:', error.message);
      }
    } else {
      alert('Status remains unchanged.');
    }
  };

  return (
    <div>
      <label>
        Do you want to change the status to 'Completed'?
        <input type="checkbox" checked={changeStatus} onChange={() => setChangeStatus(!changeStatus)} />
      </label>
      <button onClick={handleChangeStatus}>Submit</button>
    </div>
  );
};

export default StatusChange;
