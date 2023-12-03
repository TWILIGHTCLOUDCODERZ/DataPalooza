import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardSelection = ({ apiKey, selectedFolder, onNext }) => {
  const [boards, setBoards] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.post(
          'https://api.monday.com/v2',
          {
            query: `
              query GetBoardsInFolder($folderId: Int!) {
                folders(ids: [$folderId]) {
                  children {
                    id
                    name
                  }
                }
              }
            `,
            variables: { folderId: parseInt(selectedFolder) },
          },
          { headers: { 'Authorization': apiKey } }
        );

        setBoards(response.data.data.folders[0]?.children || []);
      } catch (error) {
        console.error('Error fetching boards:', error.message);
      }
    };

    if (selectedFolder) {
      fetchBoards();
    }
  }, [apiKey, selectedFolder]);

  const handleNext = () => {
    onNext(4, selectedBoards);
  };

  return (
    <div>
      <label>
        Select boards (up to 10):
        <select
          multiple
          value={selectedBoards}
          onChange={(e) => setSelectedBoards(Array.from(e.target.selectedOptions, option => option.value))}
        >
          {boards.map(board => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default BoardSelection;
