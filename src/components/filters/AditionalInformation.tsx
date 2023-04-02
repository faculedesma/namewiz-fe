import { useRef, useState } from 'react';
import { ChangeEvent } from 'react';
import './aditional.scss';

export const AditionalInformation = () => {
  const [text, setText] = useState<string>('');

  const lengthRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updated = e.target.value;
    if (lengthRef.current) {
      if (updated.length > 100) {
        lengthRef.current.classList.add('error');
      } else {
        if (lengthRef.current.classList.contains('error')) {
          lengthRef.current.classList.remove('error');
        }
      }
    }
    setText(updated);
  };

  return (
    <div className="aditional">
      <div className="aditional-input">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Additional information you want to add..."
        />
      </div>
      <p>
        <span ref={lengthRef}>{text.length}</span>/100
      </p>
    </div>
  );
};
