import React from 'react';

export class Rss extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [{
                title:"",
                link:"",
                description:"",
                pubDate:"",
                image:""
            }]
        }

        this.getTimeSincePost = this.getTimeSincePost.bind(this);
    }

    componentDidMount(){

        fetch("https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml")
            .then((response) => {
                if(!response.ok){
                    throw Error(response.statusText);
                }
                return response.text();
            })
            .then(res => {

                const xData = new DOMParser().parseFromString(res, 'text/xml');
                let jData = xmlToJson(xData);
                
                let parsedData = [];
                const rssFeedList = jData.rss.channel.item;

                rssFeedList.forEach((news) => {
                    let tObj = {};
                    tObj['title'] = news.title;
                    tObj['url'] = news.link;
                    tObj['description'] = news.description;
                    tObj['pubDate'] = news.pubDate;
                    tObj['imgUrl'] = news['media:content'];
                    parsedData.push(tObj);
                });

                console.log(parsedData);
                
                this.setState({
                    data: parsedData
                });

            })
    }

    getTimeSincePost = (date) => {
        console.log("before parse : " + date);
        const postTime = Date.parse(String(date));
        const postDate = new Date(postTime);
        const currentTime = new Date();
        //console.log(postTime.getDay());
        console.log("post : " + postDate.getUTCFullYear().toString() + " " + postDate.getUTCMonth().toString() + " " + postDate.getUTCDay().toString());
        console.log("curr : " + currentTime.getUTCHours().toString() + " " + currentTime.getUTCMinutes().toString() + " " + currentTime.getUTCSeconds().toString());
        
        const deltaDate = (currentTime - postDate);
        let hour = Math.floor(deltaDate /1000/60/60);
        let minute = Math.floor(deltaDate/1000/60);
        let seconds = Math.floor(deltaDate/1000);
        console.log("formated diff date : " + hour + ":" + minute + ":" + seconds);
        return postDate.getUTCFullYear().toString()+"-"+postDate.getUTCMonth().toString()+"-"+postDate.getUTCDay();
    }

    

    render() {

        return(
            <div className="grid-container">
                {
                   this.state.data.map((news, i) => (
                       <div key={i} className="article">
                           <a href={news.url} className="page-link" rel="noopener noreferrer" target="_blank">
                           <div className="article-box">
                               <div className="article-title">
                                   {news.title}
                                   <div className="article-img">
                                     <img src={news.imgUrl ? news.imgUrl['@attributes'].url: ""} alt=""></img>
                                   </div>
                               </div>
                               <div className="article-snippet">
                                   {news.description}
                               </div>
                               <div className="article-date">
                                   {this.getTimeSincePost(news.pubDate)}
                               </div>
                           </div>
                           </a>
                       </div>
                   )) 
                }
            </div>
        );
    }
}

//full credits for this function to https://gist.github.com/chinchang/8106a82c56ad007e27b1
function xmlToJson(xml) {
    // Create the return object
    var obj = {};
  
    if (xml.nodeType === 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      // text
      obj = xml.nodeValue;
    }
  
    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
      return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
      }, "");
    } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
}