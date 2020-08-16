import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faFireAlt, faBookmark} from '@fortawesome/free-solid-svg-icons';

export class Navbar extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			query: ""
		};
		
		this.isEnterPressed = this.isEnterPressed.bind(this);
		this.userInput = this.userInput.bind(this);
		this.sendQuery = this.sendQuery.bind(this);
		this.openMostPopular = this.openMostPopular.bind(this);
		this.openSavedArticles = this.openSavedArticles.bind(this);
	
	}

	isEnterPressed = event => { 
		if(event.key === "Enter"){
			if (this.state.query !== ""){
				this.sendQuery();
			}else{
				alert("please search for something..");
			}	
		}
	}
	
	sendQuery = () => {
		this.props.retreiveData(this.state.query);
	}

	userInput = (event) => {
		
		this.setState({
			query: event.target.value
		});
	};

	openMostPopular = () => {
		this.props.openPopular();
	}

	openSavedArticles = () => {
		this.props.openFavourite();
	}

	render() {
		return(
			<div className="navwrapper">
				<button className="popular-btn" onClick={this.openMostPopular}><FontAwesomeIcon icon={faFireAlt} title="popular"/></button>
				<button className="favourite-btn" onClick={this.openSavedArticles}><FontAwesomeIcon icon={faBookmark} title="saved articles"/></button>
				<input className="search-bar" type="text" placeholder="search here.." onChange={this.userInput} onKeyPress={this.isEnterPressed}/>
				<button className="search-btn" onClick={this.sendQuery} title="search"><FontAwesomeIcon icon={faSearch} /></button>
			</div>
		);
	}
}