import { useState } from 'react';
import axios from 'axios';

const Form = ({ setResponse }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedData = JSON.parse(input);
      const res = await axios.post('/api/bfhl', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON'
        rows={10}
        cols={30}
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Form;
