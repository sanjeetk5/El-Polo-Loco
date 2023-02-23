import logo from './logo.svg';
import './App.css';
import Sidebar from "./Components/Sidebar"
import Footer from './Components/Footer';
import Products from './Pages/Products';
import AllRoutes from './Components/AllRoutes';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
           <Sidebar/> 
         <AllRoutes/>
         {/* <Home/>         */}
    </div>
  );
}

export default App;
