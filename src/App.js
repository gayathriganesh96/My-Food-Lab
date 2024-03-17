import logo from './logo.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import Header from './components/Header';
import MealList from './components/MealList';
import Filters from './components/Filters';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto">
        <div className="pt-20">
          <Filters />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
