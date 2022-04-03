import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path ='/' element={<LandingPage/>}/>
          <Route path = '/home' element={<Home/>}/>

          <Route path= '*' element= {<NoMatch />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
