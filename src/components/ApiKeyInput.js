import React, { useState } from 'react';

const ApiKeyInput = ({ onNext }) => {
  const [apiKey, setApiKey] = useState('');

  const handleNext = () => {
    onNext(2, apiKey);
  };

  return (
    <div>
      <label>
        Enter your Monday.com API key:
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ApiKeyInput;
