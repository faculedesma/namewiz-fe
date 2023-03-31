import { Aries } from '@assets/svgs/signs/Aries';
import { Taurus } from '@assets/svgs/signs/Taurus';
import { Gemini } from '@assets/svgs/signs/Gemini';
import { Cancer } from '@assets/svgs/signs/Cancer';
import { Leo } from '@assets/svgs/signs/Leo';
import { Virgo } from '@assets/svgs/signs/Virgo';
import { Libra } from '@assets/svgs/signs/Libra';
import { Scorpio } from '@assets/svgs/signs/Scorpio';
import { Sagittarius } from '@assets/svgs/signs/Sagittarius';
import { Capricorn } from '@assets/svgs/signs/Capricorn';
import { Aquarius } from '@assets/svgs/signs/Aquarius';
import { Pisces } from '@assets/svgs/signs/Pisces';
import { useState } from 'react';
import './zodiac-signs.scss';

const signs = [
  {
    id: 'aries',
    icon: <Aries />,
    name: 'Aries'
  },
  {
    id: 'taurus',
    icon: <Taurus />,
    name: 'Taurus'
  },
  {
    id: 'gemini',
    icon: <Gemini />,
    name: 'Gemini'
  },
  {
    id: 'cancer',
    icon: <Cancer />,
    name: 'Cancer'
  },
  {
    id: 'leo',
    icon: <Leo />,
    name: 'Leo'
  },
  {
    id: 'virgo',
    icon: <Virgo />,
    name: 'Virgo'
  },
  {
    id: 'libra',
    icon: <Libra />,
    name: 'Libra'
  },
  {
    id: 'scorpio',
    icon: <Scorpio />,
    name: 'Scorpio'
  },
  {
    id: 'sagittarius',
    icon: <Sagittarius />,
    name: 'Sagittarius'
  },
  {
    id: 'capricorn',
    icon: <Capricorn />,
    name: 'Capricorn'
  },
  {
    id: 'Aquarius',
    icon: <Aquarius />,
    name: 'aquarius'
  },
  {
    id: 'pisces',
    icon: <Pisces />,
    name: 'Pisces'
  }
];

export const ZodiacSigns = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSingSelect = (id: string) => {
    let updatedSelected;
    if (selected.length < 3) {
      updatedSelected = [...selected, id];
      setSelected(updatedSelected);
      return;
    }
    if (selected.includes(id)) {
      updatedSelected = selected.filter(
        (sign) => sign !== id
      );
      setSelected(updatedSelected);
    }
  };

  return (
    <div className="zodiac">
      <h3>Zodiac signs:</h3>
      <div className="zodiac-signs">
        {signs.map((sign) => {
          return (
            <div
              key={sign.id}
              className={`zodiac-signs--item ${
                selected.includes(sign.id)
                  ? 'sign-active'
                  : ''
              }`}
              onClick={() => handleSingSelect(sign.id)}
            >
              {sign.icon}
              <label>{sign.name.substring(0, 3)}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
