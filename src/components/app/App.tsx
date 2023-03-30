import React from 'react';
import Content from '@components/content/content';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="app">
        <Content />
      </div>
    </div>
  );
};

export default App;
