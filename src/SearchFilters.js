import React, { Component, useRef, useEffect } from 'react';
import data from './data.js';
import axios from 'axios';
import getResults from './search.js'
import { SearchResults } from './SearchResults.js'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Bootstrap from "react-bootstrap";
import { Pagination, ToggleButtonGroup, ToggleButton, Table, InputGroup, Button, FormControl } from 'react-bootstrap';



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
			totalResults: 0,
			noResultString: "",
			activePage: 1,
			paginationItems: []
		}
	}

	setPaginationItems() {
		console.log("this.state.totalResults / 10: ", this.state.totalResults / 10);
		let pageCount = this.state.totalResults % 10 == 0 ? Math.trunc((this.state.totalResults / 10)) :  Math.trunc((this.state.totalResults / 10) + 1);
		console.log("pageCount: ", pageCount);
		let items = []
		for (let i = 1; i <= pageCount; i++) {
			items.push(
			  <Pagination.Item key={i} active={i === this.state.activePage} onClick={this.callSearchAPI.bind(this, i)} variant="outline-warning">
				{i}
			  </Pagination.Item>,
			);
		}
		this.setState({
			paginationItems: items
		});
	}

	callSearchAPI(page, evt) {
		console.log("page selected: ", page);
		this.setState({
			activePage: page
		})

		let resultPromise = getResults(this.state.queryString, this.state.episode, this.state.selectedCharacters, (page * 10) - 10, 10);
		let resultObject = null;
		resultPromise.then((result) => {
			resultObject = result;
			console.log(resultObject)
			if (resultObject.hasOwnProperty("data") && resultObject.data.hasOwnProperty("hits")) {
				console.log(resultObject.data.hits)
				if (resultObject.data.hits.length === 0) {
					this.setState({
						noResultString: "No results found :/",
						results: resultObject.data.hits,
						totalResults: resultObject.data.total.value
					});
				} else {
					console.log("resultObject.data.total.value: ", resultObject.data.total.value);
					this.setState({
						results: resultObject.data.hits,
						totalResults: resultObject.data.total.value,
						noResultString: ""
					});
					this.setPaginationItems();
				}
			} else {
				this.setState({
					noResultString: "Error :(",
					results: [],
					totalResults: 0
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

	handleKeyPress(target) {
		if(target.charCode==13){
			this.callSearchAPI(this.state.activePage, target);
		} 
	  }


	render() {

		return (
			<div>
				<div className="searchBar">
					<InputGroup className="mb-3">
						<FormControl
							onChange={this.updateQueryString.bind(this)}
							onKeyPress={this.handleKeyPress.bind(this)}
							placeholder="Search..."
						/>
						<InputGroup.Append>
							<Button variant="outline-warning" onClick={this.callSearchAPI.bind(this, 1)}>Search</Button>
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
				<div id="searchResults" style={{ height: 300 }}>
					<SearchResults results={this.state.results} paginationItems={this.state.paginationItems} noResultString={this.state.noResultString} ></SearchResults>
				</div>
			</div>
		);
	}
}

export default SearchFilters;
