import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetails from "./components/CountryDetails"
import ActivityCreate from './components/ActivityCreate.jsx'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/countries/:idPais" component={CountryDetails} />
          <Route path="/activity" component={ActivityCreate} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
