import React from 'react';

export class Article extends React.Component {

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

    filterPubDate(pubDate){
        return pubDate.slice(0, 10);
    }

    render(){
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
                                    <img src={this.getBaseUrl(img.url)} alt="hello world" />
                                </div>
                            ))
                        }
                        <div className="article-snippet">{article.snippet}</div>
                        <div className="article-date"> {this.filterPubDate(article.pub_date)}</div>
                    </div>
                    </a>
                </div>
                
            ))}
            </div>
        );
    }
}