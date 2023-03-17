import { Route, Routes } from 'react-router-dom';
import Register from './container/Register'
import Home from './container/Home'
import Login from './container/Login'
import NotFound from './container/NotFound'
import HeaderContainer from './container/Base/HeaderContainer';

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <Route exact path="/" component={Home} />
      <Route path="/Login" component={Login} />
    </div>
  );
};

export default App;