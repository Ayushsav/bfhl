import { useState } from 'react';

const Dropdown = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    return selectedOptions.map((option) => {
      if (response[option]) {
        return (
          <div key={option}>
            <h3>{option}</h3>
            <pre>{JSON.stringify(response[option], null, 2)}</pre>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <select multiple onChange={handleSelectChange}>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
};

export default Dropdown;
