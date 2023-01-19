import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RedPacketClicker from './components/RedPacketClicker';
import Items from './components/Items';
import Register from './components/Register';
import Login from './components/Login';
import UsersIndex from './components/UsersIndex';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clicker' element={<RedPacketClicker />} />
          <Route path='/items' element={<Items />} />
          <Route path='/users' element={<UsersIndex />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
