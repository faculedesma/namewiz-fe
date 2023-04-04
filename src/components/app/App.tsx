import { FC } from 'react';
import Content from '@components/content/Content';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { FiltersContextProvider } from '@components/contexts/FiltersContext';
import { Route, Routes } from 'react-router-dom';
import { Login } from '@components/login/Login';
import './app.scss';

const App: FC = () => {
  return (
    <FiltersContextProvider>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Content />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </FiltersContextProvider>
  );
};

export default App;
