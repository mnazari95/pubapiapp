import React from 'react';
import PostTime from '../util/PostTime';
import {Config} from '../bin/config';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MostPopular extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [],
      favoriteArticles: []
    }
  }

  componentDidMount(){

    //Config.getApiKey() is simply a function in which it returns the apikey
    fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=" + Config.getApiKey())
      .then(response => {
        if(!response){
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({
          data: res.results
        })
      })
    
    
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

  const pTime = new PostTime();
  
  const saveArticle = {
    id: article.id,
    title: article.title,
    link: article.url,
    media: {
      url: article.media ? article.media.map(img => img['media-metadata'][2].url): null,
      caption: article.media ? article.media.map(img => img.caption):null
    },
    snippet: article.abstract ? article.abstract: "none",
    publishedDate: pTime.formatDate(article.published_date),

  }
  this.setState({
      favoriteArticles: this.state.favoriteArticles.concat(saveArticle)
  },()=> this.props.updateFavArticles(saveArticle))
}

    render() {

      const postTime = new PostTime();

        return(
          <div>
            <h1 className="header">
                Most Popular
            </h1>
            <div className="grid-container">
                {
                   this.state.data.map(news => (
                       <div key={news.id} className="article">
                           <a href={news.url} className="page-link" rel="noopener noreferrer" target="_blank">
                           <div className="article-box">
                               <div className="article-title">
                                   {news.title}
                                   <div className="article-img">
                                      {news.media ? news.media.map((media, i) => (<img key={i} src={media['media-metadata'][2].url} alt={media.caption}></img>)) : null}
                                   </div>
                               </div>
                               <div className="article-snippet">
                                   {news.abstract ? news.abstract : "N/A"}
                               </div>
                               <div className="article-date">
                                   {postTime.formatDate((news.published_date))}
                               </div>
                           </div>
                           </a>
                           <button className="save-article" title="save article" onClick={() => this.saveArticle(news)}><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
                       </div>
                   )) 
                }
            </div>
            </div>
        );
    }
}