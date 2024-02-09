import {useState} from 'react';
import Main from './components/main/Main';
import Login from './components/login/Login';
import './App.css';
import Header from './components/shared/Header';

import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom';

function App() {
   const [count, setCount] = useState(0);

   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </Router>
   );
}

export default App;
