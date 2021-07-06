import './App.css';
import Home from './Home'
import Chat from './Chat'
import Call from './Call'
import Settings from './Settings'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/chat" exact component={Chat}/>
     <Route path="/settings" exact component={Settings}/>
     <Route path="/calls" exact component={Call}/>
     </Switch>
     </Router>

    </div>
  );
}

export default App;
