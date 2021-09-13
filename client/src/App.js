import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Start from './Components/Start.js'
import Mid from './Components/Mid.js'


let App = () => {
  return (
    <>
    <Router>

      <Switch>
        <Route exact path="/">
          <Start/>
        </Route>
        <Route exact path="/mid">
          <Mid/>
        </Route>
      </Switch>

    </Router>
    </>
  );
}

export default App;
