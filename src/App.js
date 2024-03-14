import logo from './logo.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import Header from './components/Header';
import MealList from './components/MealList';
import Filters from './components/Filters';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto">
        <div className="pt-20">
          <Filters />
          {/* <MealList /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
