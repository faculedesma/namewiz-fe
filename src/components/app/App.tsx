import React from 'react';
import Content from '@components/content/content';
import Header from '@components/header/Header';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default App;
