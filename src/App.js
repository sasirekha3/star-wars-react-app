import React, { Component } from 'react';
import LightsaberHandle from '../public/lightsaber.png';
import Badge from 'react-bootstrap/Badge';
import SearchFilters from './SearchFilters.js';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Bootstrap from "react-bootstrap";
import { ButtonGroup,  Dropdown, DropdownButton } from 'react-bootstrap';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App" >
        <br />
        <div>
          <h1 style={{ color: '#28C4CA' }}>A long time ago in an elasticsearch domain far, far away...</h1>
        </div>
        <p className="App-intro">
          There was an all-seeing jedi who could, with one click of a button, pull up details about characters and the dialogues they spoke in episodes 1, 2, 3, 4, 5, and 6.
        </p>
        <br />
        <br />
        

        <SearchFilters></SearchFilters>
      </div>
    );
  }
}

export default App;
