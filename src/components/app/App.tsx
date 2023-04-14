import { FC } from 'react';
import Content from '@components/content/Content';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { FiltersContextProvider } from '@components/contexts/FiltersContext';
import { UserContextProvider } from '@components/contexts/UserContext';
import { Route, Routes } from 'react-router-dom';
import { Login } from '@components/login/Login';
import { Toaster } from 'sonner';
import './app.scss';

const Home: FC = () => (
  <>
    <Header />
    <Content />
    <Footer />
    <Toaster position="bottom-center" richColors />
  </>
);

const App: FC = () => {
  return (
    <UserContextProvider>
      <FiltersContextProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wisian-ai/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </FiltersContextProvider>
    </UserContextProvider>
  );
};

export default App;
