import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import App from './App';
import Quiz from './components/Quiz/Quiz'

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/:slug" component={Quiz} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

