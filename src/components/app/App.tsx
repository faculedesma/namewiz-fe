import Content from '@components/content/Content';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
