import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RedPacketClicker from './components/RedPacketClicker';
import LoginAndRegister from './components/LoginAndRegister';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/clicker' element={<RedPacketClicker />} />
          <Route path='/loginregister' element={<LoginAndRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
