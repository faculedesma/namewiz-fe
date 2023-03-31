import { useState } from 'react';
import { ChangeEvent } from 'react';
import './letter-start.scss';

export const LetterStart = () => {
  const [letter, setLetter] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const text = e.target.value;
    if (/^[a-zA-Z]$/.test(text) || !text) {
      setLetter(text);
    }
  };

  return (
    <div className="letter-start">
      <h3>Starts with</h3>
      <input
        type="text"
        value={letter}
        onChange={handleInputChange}
        maxLength={1}
        placeholder="A"
      />
    </div>
  );
};
