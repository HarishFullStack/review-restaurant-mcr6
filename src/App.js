import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './pages/Home';
import { RetaurantDetails } from './pages/RestaurantDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details" element={<RetaurantDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
