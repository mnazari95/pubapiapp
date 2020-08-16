import React from 'react';
import PostTime from '../util/PostTime';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : null,
            isLoaded: false,
            data: [],
            favoriteArticles: []
        };

    }

	static getDerivedStateFromProps(props, state){
        
        if (props.res.data !== null){
            return {
                data: props.res.docs
            };
        }
        return null;
        
    }
    
    componentDidMount() {
        //load state with localstorage data
        if (window.localStorage.getItem("articles") !== null) {
            this.setState({
                favoriteArticles: JSON.parse(window.localStorage.getItem("articles"))
            })
        }
    }

    componentWillUnmount() {
        //save state to localstorage
        window.localStorage.setItem("articles", JSON.stringify(this.state.favoriteArticles));
    }

    saveArticle = (article) => {
        
        const saveArticle = {
            id: article._id,
            title: article.headline.main,
            link: article.web_url,
            media: {
              url: article.multimedia ? article.multimedia.filter(pic => (pic.subType === "xlarge")).map(img => this.getBaseUrl(img.url)): null,
              caption: null
            },
            snippet: article.snippet ? article.snippet: "none",
            publishedDate: this.trimDate(article.pub_date),
        
          }
        this.setState({
            favoriteArticles: this.state.favoriteArticles.concat(saveArticle)
        },()=> this.props.updateFavArticles(saveArticle))
    }

    trimDate = (date) => {
        const postTime = new PostTime();
        const trimmedDate = date.slice(0,10);
        return postTime.formatDate(trimmedDate);

    }
    getBaseUrl(link){
        return "https://www.nytimes.com/" + link;
    }

    render(){


        return(
            <div className="grid-container">
            {(this.state.data).map(article => (
                
                <div key={article._id} className="article">
                    <a href={article.web_url} className="page-link"  rel="noopener noreferrer" target="_blank">
                    <div className="article-box"> 
                    <div className="article-title">{article.headline.main}</div>
                        {
                            (article.multimedia).filter(pic => (pic.subType === "xlarge")).map((img, i) => (
                                <div key={i} className="article-img">
                                    <img src={this.getBaseUrl(img.url)} alt="" />
                                </div>
                            ))
                        }
                        <div className="article-snippet">{article.snippet}</div>
                        <div className="article-date"> {this.trimDate(article.pub_date)}</div>
                    </div>
                    </a>
                    <button className="save-article" title="save article" onClick={() => this.saveArticle(article)}><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
                </div>
                
            ))}
            </div>
        );
    }
}