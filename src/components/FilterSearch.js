import React from 'react';

export class FilterSearch extends React.Component {

    mSectionList = [];
    mFilterList = [];

    constructor(props){
        super(props);

        this.state = {
            sDate: "",
            eDate: "",
            sectionList:[],
            filterList:[],
            sort: ""
        }

        this.myCheckBox = this.myCheckBox.bind(this);
    }

    checkList = (array, value) => {
        return array.includes(value);
    }

    updateState = () => {

        this.setState({
            filterList: this.mFilterList,
            sectionList: this.mSectionList
        }, ()=>{
            this.props.retreiveFilteredQuery(this.state);
        });
    }

    checkBoxEvent = (event) => {
        const value = event.target.value;
        if (event.target.checked){
            this.handleState(value);
        }else{
            //remove from state if checkbox is not ticked
            if (this.checkList(this.mFilterList, value)){
                this.mFilterList.splice(this.mFilterList.indexOf(value), 1);
            }
            if (this.checkList(this.mSectionList, value)){
                this.mSectionList.splice(this.mSectionList.indexOf(value), 1);
            }
        }

        this.updateState();
    }

    inputEvent = (event) => {
        
        const value = event.target.value;
        const name = event.target.name;
        
        if (name === "sdate"){
            this.setState({
                sDate: value
            })
        }else{
            this.setState({
                eDate: value
            });
        }
        
        this.updateState();
    }

    handleSort = (event) => {

        const value = event.target.value;
        this.setState({
            sort: value
        });

        this.updateState();
    }

    handleState = (value) => {

        switch(value){
            case"article":
            case"biography":
            case"blog":
            case"interview":
            case"news":
            case"review":
            case"statistics":
                //to prevent duplicate entries
                if (!this.checkList(this.mFilterList, value)){
                    this.mFilterList.push(value);
                }
                break;
            default:
                //we assume value is a part of section if all else failed
                if (!this.checkList(this.mSectionList, value)){
                    this.mSectionList.push(value);
                }
                break;
        }
        
    }

    myCheckBox = (param) => {

        return (
            <div key={param}>
                <input type="checkbox" id={param} value={param} onChange={this.checkBoxEvent}/>
                <label htmlFor={param}>{this.capFirstLetter(param)}</label>
            </div>
        );
    }

    capFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() { 

        const newsSections = ["Arts", "Automobiles", "Business", 
            "Education", "Food", "Health", "Movies", "National", 
            "Real Estate", "Science", "Technology","Sports", "World"];

        const filterQueryBy = ["news","article", "biography", "blog", "interview", 
             "review", "statistics"];
    
        return(
            <div className="filter-wrapper" >
                <div className="filter-container">
                    <div className="filter-options">
                        <div className="option-element"><label>Section</label></div>
                        <div className="option-element checkbox-list">
                            {
                                newsSections.map((section) => (
                                    this.myCheckBox(section)
                                ))
                            }
                        </div>
                    </div>
                    <div className="filter-options">
                        <div className="option-element"><label>Type of Material</label></div>
                        <div className="option-element checkbox-list">
                            {
                                filterQueryBy.map((queryType) => (
                                    this.myCheckBox(queryType)
                                ))
                            }
                        </div>
                        <div className="option-element"><label>Sort by</label></div>
                        <div className="option-element">
                        <input type="date" placeholder="start date" name="sdate" onChange={this.inputEvent}></input>
                        </div>
                        <div className="option-element">
                            <input type="date" placeholder="end date" name="edate" onChange={this.inputEvent}></input>
                            <select className="filter-selector" onChange={this.handleSort}>
                                <option value="relevance">relevance</option>
                                <option value="oldest">old</option>
                                <option value="newest">new</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}