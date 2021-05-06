import logo from './logo.svg';
import './App.css';

//Library Imports
import {Route, Link} from "react-router-dom";
//component imports
import Homepage from "./pages/homepage/homepage.component";
import Hats from "./pages/hats/hats.component";
import Shop from "./pages/shop/shop.component";

function App() {
  return (
    <div className="App">
        <Route exact={true}
               path='/'
               component={Homepage}
        />
        <Route exact={true}
               path='/shop'
               component={Shop}
               />
    </div>
  );
}

export default App;
