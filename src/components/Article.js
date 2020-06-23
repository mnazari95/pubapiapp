import React from 'react';
import PostTime from '../util/PostTime';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : null,
            isLoaded: false,
            data: []
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

    
    getBaseUrl(link){
        return "https://www.nytimes.com/" + link;
    }

    render(){

        const postTime = new PostTime();

        return(
            <div className="grid-container">
            {(this.state.data).map((article, i) => (
                
                <div key={i} className="article">
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
                        <div className="article-date"> {postTime.formatDate(article.pub_date)}</div>
                    </div>
                    </a>
                </div>
                
            ))}
            </div>
        );
    }
}