import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import SearchFilters from './SearchFilters.js';
import githubLogo from './GitHub-logo.png';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDisclaimer: false
    }
  }

  toggleDisclaimer(evt) {
    this.state.showDisclaimer === true ? this.setState({ showDisclaimer: false }) : this.setState({ showDisclaimer: true })
  }

  acceptDisclaimer(evt) {
    this.setState({
      showDisclaimer: false
    });
  }

  render() {
    return (
      <div className="App" >
        <Navbar variant="dark" expand="lg">
          <Navbar.Brand href="#home">Star Wars Dialog Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="https://sasirekhakambhampaty.com" target="_blank">SasirekhaKambhampaty.com</Nav.Link>
              <Nav.Link onClick={this.toggleDisclaimer.bind(this)}>Disclaimer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="https://github.com/sasirekha3/star-wars-react-app" target="_blank"><img src={githubLogo} alt="Github"></img></Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        {this.state.showDisclaimer === false ? "" :
          <Card border="warning" bg="dark" className="card-transparent" ><Card.Body >Star Wars, the Star Wars logo, all names of Star Wars characters, vehicles and any other Star Wars related items are registered trademarks and/or copyrights of Lucasfilm Ltd., or their respective trademark and copyright holders. This website is in no way affiliated with or endorsed by Lucasfilm Limited or any of its subsidiaries, employees, or associates. It makes no claim to own Star Wars or any of the copyrights or trademarks related to it. The Star Wars titles and associated names are the sole property of Lucasfilm Limited. None of the information on this blog about the Star Wars franchise is guaranteed to be accurate. It’s usually a good idea to check other sources if you want to be sure of facts about the Star Wars franchise.
          <br />The source of all dialogs from episodes 1 through 6 is <a href="http://www.imsdb.com" target="_blank" title="Internet Movie Script Database">Internet Movie Script Database</a>.
          <br /> <Button variant="success" onClick={this.acceptDisclaimer.bind(this)}>OK</Button>
          </Card.Body>
          </Card>
        }
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
