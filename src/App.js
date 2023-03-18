import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './container/Register'
import Home from './container/Home'
import Login from './container/Login'
import NotFound from './container/NotFound'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;