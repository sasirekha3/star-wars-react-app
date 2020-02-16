import React, { Component } from 'react';
import LightsaberHandle from '../public/lightsaber.png';
import Badge from 'react-bootstrap/Badge';
import data from './data.js';
import axios from 'axios';
import getResults from './search.js'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Bootstrap from "react-bootstrap";
import { ButtonGroup, ToggleButtonGroup, ToggleButton, Table, InputGroup, Button, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';


class SearchFilters extends Component {

	constructor(props) {
		super(props);
		let superSetJson = {};
		let all = [1, 2, 3, 4, 5, 6];
		for (var episode in all) {
			for (var key in data["episode" + all[episode]]["characters"]) {
				superSetJson[key] = data["episode" + all[episode]]["characters"][key];
			}
		}
		this.state = {
			queryString: "",
			episode: [],
			characters: superSetJson,
			selectedCharacters: [],
			results: [],
			noResultString: ""
		}
	}

	callSearchAPI(evt) {

		let resultPromise = getResults(this.state.queryString, this.state.episode, this.state.selectedCharacters);
		let resultObject = null;
		resultPromise.then((result) => {
			resultObject = result;
			console.log(resultObject)
			if(resultObject.hasOwnProperty("data") && resultObject.data.hasOwnProperty("hits")){
				console.log(resultObject.data.hits)
				this.setState({
					results: resultObject.data.hits
				});
			} else {
				console.log("NO HITS");
			}
		})
		

	}

	updateQueryString(evt) {
		this.setState({
			queryString: evt.target.value
		});
	}

	updateSelectedCharacters(evt) {
		this.setState({
			selectedCharacters: evt
		});
	}

	updateCharacters(evt) {
		let superSetJson = {};
		let all = [1, 2, 3, 4, 5, 6];
		if (evt.length === 0) {
			for (var episode in all) {
				for (var key in data["episode" + all[episode]]["characters"]) {
					superSetJson[key] = data["episode" + all[episode]]["characters"][key];
				}
			}
		} else {
			for (var episode in evt) {
				for (var key in data["episode" + evt[episode]]["characters"]) {
					superSetJson[key] = data["episode" + evt[episode]]["characters"][key];
				}
			}
		}

		this.setState({
			episode: evt,
			characters: superSetJson
		});
	}


	render() {

		return (
			<div>
				<div className="searchBar">
					{/* <table>
            <tbody>
              <tr >
                {/* <td><img src={LightsaberHandle}  style={{height: "calc(1.5em + .75rem + 2px + 0.375rem + 0.375rem + 0.25rem)"}}/></td> 
                <td>
                <span> */}
					<InputGroup className="mb-3">
						<FormControl
							onChange={this.updateQueryString.bind(this)}
							placeholder="Search..."
						/>
						<InputGroup.Append>
							<Button variant="outline-warning" onClick={this.callSearchAPI.bind(this)}>Search</Button>
						</InputGroup.Append>
					</InputGroup>
					{/* </span>
                </td>
              </tr>
            </tbody>
          </table> */}


				</div>
				<br />
				<br />
				<div id="searchFilters">
					<div className="btn-group-vertical">
						<Table responsive borderless>
							<thead>
								<tr>
									<th style={{ color: '#F6C103' }}>Episodes</th>
									<th style={{ color: '#F6C103' }}>Characters</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<ToggleButtonGroup type="checkbox" vertical="true" onChange={this.updateCharacters.bind(this)}>
											<ToggleButton value={1} variant="outline-info">Episode I: The Phantom Menace</ToggleButton>
											<ToggleButton value={2} variant="outline-info">Episode II: Attack of the Clones</ToggleButton>
											<ToggleButton value={3} variant="outline-info">Episode III: Revenge of the Sith</ToggleButton>
											<ToggleButton value={4} variant="outline-info">Episode IV: A New Hope</ToggleButton>
											<ToggleButton value={5} variant="outline-info">Episode V: The Empire Strikes Back</ToggleButton>
											<ToggleButton value={6} variant="outline-info">Episode VI: Return of the Jedi</ToggleButton>
										</ToggleButtonGroup>
									</td>
									<td>
										<ToggleButtonGroup type="checkbox" vertical="true" onChange={this.updateSelectedCharacters.bind(this)}>
											{
												Object.keys(this.state.characters).map(character => (
													<ToggleButton key={character} value={character} variant="outline-info">{this.state.characters[character]}</ToggleButton>
												))
											}
										</ToggleButtonGroup>
									</td>
								</tr>
							</tbody>
						</Table>


					</div>
				</div>
				<div id="searchResults">
					{this.state.results.length === 0 ?
						<h2 id="noResults">{this.state.noResultString}</h2>
						:
						<div>
						<br/>
						<br/>
						<h2>Results:</h2>
						<Table responsive bordered variant="dark">
							<thead>
								<tr>
									<th>Character</th><th>Movie</th><th>Scene Title</th><th>Quote</th><th>Year</th><th>Sequence</th>
								</tr>
							</thead>
							<tbody>
								{this.state.results.map(result => (
									<tr key={result._id}>
										<td>{result._source.character}</td><td>{result._source.movie}</td><td>{result._source.sceneTitle}</td><td>{result._source.quote}</td><td>{result._source.year}</td><td>{result._source.sequence}</td>
									</tr>
								))}
							</tbody>
						</Table>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default SearchFilters;
