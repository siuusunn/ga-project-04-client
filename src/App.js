import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RedPacketClicker from './components/RedPacketClicker';
import Register from './components/Register';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clicker' element={<RedPacketClicker />} />
          <Route path='/users' element={<Leaderboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
