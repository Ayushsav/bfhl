import { useState } from 'react';
import Form from '../components/Form';
import Dropdown from '../components/Dropdown';

export default function Home() {
  const [response, setResponse] = useState(null);

  return (
    <>
    <div>
      <h1>Your Roll Number: 0832CS211043</h1>
      <Form setResponse={setResponse} />
      {response && <Dropdown response={response} />}
    </div>
    </>
  );
}
