import React, { Suspense } from 'react';
import './App.scss';
import MostPopular from './components/MostPopular';
import {Navbar} from './components/Navbar';
import {Pagination} from './components/Pagination';
import {FilterSearch} from './components/FilterSearch';
import {Config} from './bin/config';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
const LazyArticle = React.lazy(() => import('./components/Article'));

export class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isReady: false,
			isFilterSearch: false,
			page: 0,
			numOfArticle: 0,
			offset: 0,
			lastPage: 0,
			userQuery: "",
			res: [],
			pagination: [],
			filterObj: {sections: [], filter: [], sDate: "", eDate: "", sort: ""},
			err: null
		}

		this.queryData = this.queryData.bind(this);
		this.adjustPagination = this.adjustPagination.bind(this);
	}

	//toggle wether to show/hide filter search
	filterSearch = () => {

		if (!this.state.isFilterSearch){
			this.setState({
				isFilterSearch: true,
			});
		}else{
			this.setState({
				isFilterSearch: false,
			});
		}
		
	}

	//receives user's input from filtersearch component
	onFilterSearch = (compState) => {
		this.setState({
			filterObj: {
				sections: compState.sectionList, 
				filter: compState.filterList, 
				sDate: compState.sDate, 
				eDate: compState.eDate,
				sort: compState.sort
			}
		});
	};

	onSearch = (cData) => {
		this.setState(
			{
				userQuery: cData
			},
			() => {
				this.queryData();
			}
		);
	};

	onPageChange = (inPage) => {
		this.setState(
			{
				page: inPage
			},
			() => {
				this.queryData();
			}
		);
	}

	queryData = () => {
		if (this.state.userQuery !== ""){
			this.processFetch(this.state.userQuery);
		}
	}

	adjustPagination = () => {
		
		let total = this.state.numOfArticle;
		let limit = 10;
		let pageObj= [], mArr = [];
		let pages = Math.floor(total/limit);
		let mOffset = this.state.offset;
		const pageNumber = Math.floor(mOffset/10);

		for (let i=0; i < pages;i++){
			if (i < 100){
				pageObj[i] = i+1;
			}else{
				break;
			}
		}
		const lPage = (pageObj.length - 1);

		if(pageNumber >= 5 && pageNumber <= 93){
			const moveBy = 5;
			const a = pageNumber - moveBy;
			const b = pageNumber + moveBy;
			mArr = pageObj.slice(a,b);
		}else if (pageNumber > 93){
			mArr = pageObj.slice(90,100);
		}else if (pageNumber < 5){
			mArr = pageObj.slice(0, 10);
		}
		
		this.setState({
			pagination: mArr,
			page: pageNumber,
			lastPage: lPage
		});

	}

	//changes format from YYYY-MM-DD to YYYYMMDD
	formatDate = (str) => {
		return str.replace(/-/g, "");
	}

	//can replace Config.getApiKey() with your own api key from https://developer.nytimes.com/
	processFetch = (queryParam) => {
		
		//filtered fetch
		if(this.state.isFilterSearch){

			let startDate = "", endDate = "";
			let sortBy = "&sort=relevance";
			let sectionListStr = "", filterListStr = "";

			//filter search based on date
			if(this.state.filterObj.sDate !== "" && this.state.filterObj.eDate){
				//call date format to remove hyphenes
				startDate = "&begin_date=" + this.formatDate(this.state.filterObj.sDate);
				endDate = "&end_date=" + this.formatDate(this.state.filterObj.eDate);

			}
			
			if(this.state.filterObj.sort !== ""){
				sortBy = "&sort=" + this.state.filterObj.sort;
			}

			if(typeof this.state.filterObj.sections != "undefined" 
				&& this.state.filterObj.sections != null
				&& this.state.filterObj.sections.length != null 
				&& this.state.filterObj.sections.length > 0){
				
				sectionListStr = "&fq=section_name:(";
				for (let elem in this.state.filterObj.sections){
					sectionListStr += "\"" +this.state.filterObj.sections[elem] + "\"";
				}
				sectionListStr += ")";

			}

			if (typeof this.state.filterObj.filter != "undefined"
				&& this.state.filterObj.filter != null
				&& this.state.filterObj.filter.length != null
				&& this.state.filterObj.filter.length > 0){
				
				//check if section checkboxes is selected
				if (sectionListStr.length > 0){
					filterListStr = " AND";
				}else{
					filterListStr = "&fq="
				}
				filterListStr += " type_of_material:("
				for(let i in this.state.filterObj.filter){
					filterListStr += "\"" + this.state.filterObj.filter[i] + "\"";
				}
				filterListStr += ")";
			}

			fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
				+ this.state.userQuery
				+ sectionListStr 
				+ filterListStr
				+ startDate
				+ endDate
				+ sortBy
				+ "&page=" + this.state.page
				+ "&api-key=" + Config.getApiKey()
			).then((response)=>{
				if(!response.ok){
					throw Error(response.statusText);
				}
				return response;
			}
			).then(res => res.json()
			).then(
				result => {
					this.setState({
						res: result.response,
						numOfArticle: result.response.meta.hits,
						offset: result.response.meta.offset,
						isReady: true
					});
				},
				error => {
					this.setState({
						err: error,
						isReady: true
					});
				}
			).then(
				() => this.adjustPagination()
			)
		}else{
			//default fetch
			fetch(
				"https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + queryParam +
				"&sort=relevance" +
				"&page=" + this.state.page +
				"&api-key=" + Config.getApiKey()
			).then((response)=>{
				if(!response.ok){
					throw Error(response.statusText);
				}
				return response;
			}).then(res => res.json()
			).then(
				result => {
					this.setState({
						res: result.response,
						numOfArticle: result.response.meta.hits,
						offset: result.response.meta.offset,
						isReady: true
					});
				},
				error => {
					this.setState({
						err: error,
						isReady: true
					});
				}
			).then(
				() => this.adjustPagination()
			);
		}
		
	}

	render() {

		return (
			<div className="app">
				<Navbar retreiveData = {this.onSearch} />
				{this.state.isFilterSearch ? <FilterSearch retreiveFilteredQuery = {this.onFilterSearch} toggleFilter={this.state.isFilterSearch} /> : null}
				<button className="filter-btn" onClick={this.filterSearch}><FontAwesomeIcon icon={this.state.isFilterSearch ? faArrowUp:faArrowDown} /></button>
				<Suspense fallback={<div><img src="logo.svg" alt=""></img></div>}>
					{this.state.isReady ? <LazyArticle res={this.state.res}/> : <MostPopular />}
				</Suspense>
				{this.state.isReady ? <Pagination retreivePage = {this.onPageChange} btnDetail = {this.state.pagination} lastPage = {this.state.lastPage}/> : null}
			</div>
		);
	}
}