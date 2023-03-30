import React from 'react';
import Content from '@components/content/content';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default App;
