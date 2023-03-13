import { Route, Routes } from 'react-router-dom';
import Register from './container/Register'
import Home from './container/Home'
import Login from './container/Login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;