import { useState } from 'react';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import './content.scss';

const Content = () => {
  const [text, setText] = useState('');

  const handleInputChange = (e) => setText(e.target.value);

  const handleSubscribeNewsletter = (e) => console.log(e);

  return (
    <div className="content">
      <div className="content-left">
        <h1>
          Let's find the <b>perfect</b> name for your little
          one
        </h1>
        <h2>
          Our algorithms take into account a wide range of
          criteria, including zodiac signs, origin, meaning,
          and popularity.
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
      <div className="content-right"></div>
    </div>
  );
};

export default Content;
