import React from 'react';
import PostTime from '../util/PostTime';
import {Config} from '../bin/config';

export default class MostPopular extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: []
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
                   this.state.data.map((news, i) => (
                       <div key={i} className="article">
                           <a href={news.url} className="page-link" rel="noopener noreferrer" target="_blank">
                           <div className="article-box">
                               <div className="article-title">
                                   {news.title}
                                   <div className="article-img">
                                      <img src={news.media ? news.media.map(media => media['media-metadata'][2].url): null} alt=""></img>
                                   </div>
                               </div>
                               <div className="article-snippet">
                                   {news.abstract ? news.abstract : "N/A"}
                               </div>
                               <div className="article-date">
                                   {postTime.formatDate((news.updated))}
                               </div>
                           </div>
                           </a>
                       </div>
                   )) 
                }
            </div>
            </div>
        );
    }
}