//import logo from './logo.svg';
import React from "react";
import styles from "./components/App.module.css"
import './components/App.css';
import { Publish } from './components/Publish';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PublishDetails } from "./pages/PublishDetails";
import { Inicio } from "./pages/Inicio";
//import { Switch } from 'react-router-dom';
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
export function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <h1 className={styles.title}>Publicaciones pendientes</h1>
        </Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/publicacion/:id"><PublishDetails /></Route>
          <Route path="/"><Inicio /></Route>
        </Switch>
      </main>
    </Router>
  );
}
/*export function App() {
  return (
    <div>
      <header>
        <h1 className={styles.title}>Publicaciones pendientes</h1>
      </header>
      <main>
        <Publish />
      </main>
    </div>
  );
}*/
export default App;
