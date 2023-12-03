import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FolderSelection = ({ apiKey, onNext }) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.post(
          'https://api.monday.com/v2',
          {
            query: `
              query {
                folders(workspace_ids: 3622625) {
                  name
                  id
                }
              }
            `,
          },
          { headers: { 'Authorization': apiKey } }
        );

        setFolders(response.data.data.folders);
      } catch (error) {
        console.error('Error fetching folders:', error.message);
      }
    };

    fetchFolders();
  }, [apiKey]);

  const handleNext = () => {
    onNext(3, selectedFolder);
  };

  return (
    <div>
      <label>
        Select a folder:
        <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)}>
          <option value="">Select Folder</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FolderSelection;
