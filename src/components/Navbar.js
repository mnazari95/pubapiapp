import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export class Navbar extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			query: ""
		};
		
		this.isEnterPressed = this.isEnterPressed.bind(this);
		this.userInput = this.userInput.bind(this);
		this.sendQuery = this.sendQuery.bind(this);
	
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

	render() {
		return(
            <div className="flex-container">
                    <input className="search-bar" type="text" placeholder="search here.." onChange={this.userInput} onKeyPress={this.isEnterPressed}></input>
                    <button className="search-btn" onClick={this.sendQuery}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
		);
	}
}