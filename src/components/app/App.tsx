import { FC } from 'react';
import Content from '@components/content/Content';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { FiltersContextProvider } from '@components/contexts/FiltersContext';
import './app.scss';

const App: FC = () => {
  return (
    <FiltersContextProvider>
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </FiltersContextProvider>
  );
};

export default App;
