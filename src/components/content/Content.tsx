import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import { Formule } from '@assets/svgs/Formule';
import { ZodiacSigns } from '@components/filters/ZodiacSigns';
import { Nationality } from '@components/filters/Nationality';
import { LetterStart } from '@components/filters/LetterStart';
import { Gender } from '@components/filters/Gender';
import { Longitude } from '@components/filters/Longitude';
import { AditionalInformation } from '@components/filters/AditionalInformation';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import './content.scss';

const Content = () => {
  const [text, setText] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => setText(e.target.value);

  const handleSubscribeNewsletter = (
    e: FormEvent<HTMLFormElement>
  ) => console.log(e);

  return (
    <div className="container">
      <div className="content">
        <div className="content-left">
          <h1>
            Let's find the <b>perfect</b> name for your
            little one
          </h1>
          <h2>
            Our algorithms take into account a wide range of
            criteria, including zodiac signs, origin,
            meaning, and popularity.
          </h2>
          <div className="content-left--input">
            <label>Subscribe to newsletter</label>
            <form onSubmit={handleSubscribeNewsletter}>
              <div className="content-left--input-box">
                <input
                  type="text"
                  value={text}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <ArrowRight />
              </div>
            </form>
          </div>
        </div>
        <div className="content-right">
          <div className="content-right--filters">
            <div className="content-right--filters-first">
              <ZodiacSigns />
            </div>
            <div className="content-right--filters-second">
              <Nationality />
              <Gender />
              <Longitude />
            </div>
            <div className="content-right--filters-third">
              <LetterStart />
            </div>
            <div className="content-right--filters-five">
              <AditionalInformation />
            </div>
            <div className="content-right--filters-cta">
              <PrimaryButton label="Get Names" />
            </div>
          </div>
        </div>
        <div className="content-bg">
          <Formule />
        </div>
      </div>
    </div>
  );
};

export default Content;
