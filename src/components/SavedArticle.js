import React from 'react';

export default class SavedArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listOfArticle: []
        }
    }

    componentDidMount() {
        //load state with localstorage data
        if (window.localStorage.getItem("articles") !== null) {
            this.setState({
                listOfArticle: JSON.parse(window.localStorage.getItem("articles"))
            })
        }
    }

    componentWillUnmount() {
        //save state to localstorage
        window.localStorage.setItem("articles", JSON.stringify(this.state.listOfArticle));
    }

    removeArticle = (article) => {

        let tempArr = [...this.state.listOfArticle];
        let index;
        index = tempArr.indexOf(article);
        if (index !== -1){
            tempArr.splice(index, 1);
            this.setState({
                listOfArticle: tempArr
            })
        }
        
    }

    getGridColumn = () => {
        return this.state.listOfArticle.length - 1;
    }

    render() {
        return(
            <>
                <h1 className="header">
                Saved Articles
                </h1>
                <div className="grid-container" style={{gridTemplateColumns: `repeat(${this.getGridColumn},auto)`}}>
                {
                   this.state.listOfArticle.map(news => (
                       <div key={news.id} className="article">
                           <a href={news.link} className="page-link" rel="noopener noreferrer" target="_blank">
                           <div className="article-box">
                               <div className="article-title">
                                   {news.title}
                                   <div className="article-img">
                                      {news.media ? <img src={news.media.url} alt={news.media.caption}></img> : null}
                                   </div>
                               </div>
                               <div className="article-snippet">
                                   {news.snippet}
                               </div>
                               <div className="article-date">
                                   {(news.publishedDate)}
                               </div>
                           </div>
                           </a>
                            <button onClick={() => this.removeArticle(news)}>remove</button>
                       </div>
                   )) 
                }
                </div>
            </>
        );
    }
}