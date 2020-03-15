import React, { Component, useRef, useEffect} from 'react';
import data from './data.js';
import axios from 'axios';
import getResults from './search.js'
import {SearchResults} from './SearchResults.js'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Bootstrap from "react-bootstrap";
import { ButtonGroup, ToggleButtonGroup, ToggleButton, Table, InputGroup, Button, FormControl} from 'react-bootstrap';

 

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

	// focusResults(){
	// 	this.resultsDiv.current.focus();
	// }

	callSearchAPI(evt) {

		let resultPromise = getResults(this.state.queryString, this.state.episode, this.state.selectedCharacters);
		let resultObject = null;
		resultPromise.then((result) => {
			resultObject = result;
			console.log(resultObject)
			if(resultObject.hasOwnProperty("data") && resultObject.data.hasOwnProperty("hits")){
				console.log(resultObject.data.hits)
				if (resultObject.data.hits.length === 0){
					this.setState({
						noResultString: "No results found :/",
						results: resultObject.data.hits
					});
				} else {
					this.setState({
						results: resultObject.data.hits
					});
				}
			} else {
				this.setState({
					noResultString: "Error :(",
					results: resultObject.data.hits
				});
				console.log("Error: hits");
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
					<InputGroup className="mb-3">
						<FormControl
							onChange={this.updateQueryString.bind(this)}
							placeholder="Search..."
						/>
						<InputGroup.Append>
							<Button variant="outline-warning" onClick={this.callSearchAPI.bind(this)}>Search</Button>
						</InputGroup.Append>
					</InputGroup>
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
				<div id="searchResults" style={{height:300}}>
					{this.state.results.length === 0 ?
						<h2 id="noResults">{this.state.noResultString}</h2>
						:
						<div>
							<br/>
							<br/>
							<h2>Results:</h2>
							<SearchResults results={this.state.results} ></SearchResults>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default SearchFilters;
