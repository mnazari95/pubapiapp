(this.webpackJsonppubapiapp=this.webpackJsonppubapiapp||[]).push([[0],{14:function(e,t,a){e.exports=a(26)},19:function(e,t,a){},20:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(13),s=a.n(i),c=(a(19),a(3)),l=a(4),o=a(6),u=a(5),m=a(2),f=a(7),h=(a(20),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={error:null,isLoaded:!1,data:[]},a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"getBaseUrl",value:function(e){return"https://www.nytimes.com/"+e}},{key:"filterPubDate",value:function(e){return console.log(e),e.slice(0,10)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"grid-container"},this.state.data.map((function(t,a){return r.a.createElement("div",{key:a,className:"article"},r.a.createElement("a",{href:t.web_url,className:"page-link",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("div",{className:"article-box"},r.a.createElement("div",{className:"article-title"},t.headline.main),t.multimedia.filter((function(e){return"xlarge"===e.subType})).map((function(t,a){return r.a.createElement("div",{key:a,className:"article-img"},r.a.createElement("img",{src:e.getBaseUrl(t.url),alt:"hello world"}))})),r.a.createElement("div",{className:"article-snippet"},t.snippet),r.a.createElement("div",{className:"article-date"}," ",e.filterPubDate(t.pub_date)))))})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return null!==e.res.data?{data:e.res.docs}:null}}]),t}(r.a.Component)),p=a(9),d=a(8),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).isEnterPressed=function(e){"Enter"===e.key&&(""!==a.state.query?a.sendQuery():alert("please search for something.."))},a.sendQuery=function(){a.props.retreiveData(a.state.query)},a.userInput=function(e){a.setState({query:e.target.value})},a.state={query:""},a.isEnterPressed=a.isEnterPressed.bind(Object(m.a)(a)),a.userInput=a.userInput.bind(Object(m.a)(a)),a.sendQuery=a.sendQuery.bind(Object(m.a)(a)),a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"flex-container"},r.a.createElement("input",{className:"search-bar",type:"text",placeholder:"movie, politics, technology..",onChange:this.userInput,onKeyPress:this.isEnterPressed}),r.a.createElement("button",{className:"search-btn",onClick:this.sendQuery},r.a.createElement(p.a,{icon:d.c})))}}]),t}(r.a.Component),g=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).sendPage=function(e){a.setState({getPage:e.target.value},(function(){a.props.retreivePage(a.state.getPage)}))},a.state={lastPage:0,getPage:0,pages:[]},a.sendPage=a.sendPage.bind(Object(m.a)(a)),a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page-list"},r.a.createElement("button",{className:"page-item",onClick:this.sendPage,value:0},"first"),this.state.pages.map((function(t,a){return r.a.createElement("button",{key:a,className:"page-item",onClick:e.sendPage,value:t-1},t)})),r.a.createElement("button",{className:"page-item",onClick:this.sendPage,value:this.state.lastPage},"last"))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{pages:e.btnDetail,lastPage:e.lastPage}}}]),t}(r.a.Component),v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).mSectionList=[],a.mFilterList=[],a.checkList=function(e,t){return e.includes(t)},a.updateState=function(){a.setState({filterList:a.mFilterList,sectionList:a.mSectionList},(function(){a.props.retreiveFilteredQuery(a.state)}))},a.checkBoxEvent=function(e){var t=e.target.value;e.target.checked?a.handleState(t):(a.checkList(a.mFilterList,t)&&a.mFilterList.splice(a.mFilterList.indexOf(t),1),a.checkList(a.mSectionList,t)&&a.mSectionList.splice(a.mSectionList.indexOf(t),1)),a.updateState()},a.inputEvent=function(e){var t=e.target.value;"sdate"===e.target.name?a.setState({sDate:t}):a.setState({eDate:t}),a.updateState()},a.handleSort=function(e){var t=e.target.value;a.setState({sort:t}),a.updateState()},a.handleState=function(e){switch(e){case"article":case"biography":case"blog":case"interview":case"news":case"review":case"statistics":a.checkList(a.mFilterList,e)||a.mFilterList.push(e);break;default:a.checkList(a.mSectionList,e)||a.mSectionList.push(e)}},a.myCheckBox=function(e){return r.a.createElement("div",{key:e},r.a.createElement("input",{type:"checkbox",id:e,value:e,onChange:a.checkBoxEvent}),r.a.createElement("label",{htmlFor:e},a.capFirstLetter(e)))},a.capFirstLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},a.state={sDate:"",eDate:"",sectionList:[],filterList:[],sort:""},a.myCheckBox=a.myCheckBox.bind(Object(m.a)(a)),a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"filter-wrapper"},r.a.createElement("div",{className:"filter-container"},r.a.createElement("div",{className:"filter-options"},r.a.createElement("div",{className:"option-element"},r.a.createElement("label",null,"Section")),r.a.createElement("div",{className:"option-element checkbox-list"},["Arts","Automobiles","Business","Education","Food","Health","Movies","National","Real Estate","Science","Technology","Sports","World"].map((function(t){return e.myCheckBox(t)})))),r.a.createElement("div",{className:"filter-options"},r.a.createElement("div",{className:"option-element"},r.a.createElement("label",null,"Type of Material")),r.a.createElement("div",{className:"option-element checkbox-list"},["news","article","biography","blog","interview","review","statistics"].map((function(t){return e.myCheckBox(t)}))),r.a.createElement("div",{className:"option-element"},r.a.createElement("label",null,"Etc..")),r.a.createElement("div",{className:"option-element"},r.a.createElement("input",{type:"date",placeholder:"start date",name:"sdate",onChange:this.inputEvent}),r.a.createElement("select",{onChange:this.handleSort},r.a.createElement("option",{value:"relevance"},"relevance"),r.a.createElement("option",{value:"oldest"},"old"),r.a.createElement("option",{value:"newest"},"new"))),r.a.createElement("div",{className:"option-element"},r.a.createElement("input",{type:"date",placeholder:"end date",name:"edate",onChange:this.inputEvent})))))}}]),t}(r.a.Component),y=function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,null,[{key:"getApiKey",value:function(){return"EOnWpr6lCuv619SnxF99SXJJ0y4T38Jq"}}]),e}(),E=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).filterSearch=function(){a.state.isFilterSearch?a.setState({isFilterSearch:!1}):a.setState({isFilterSearch:!0})},a.onFilterSearch=function(e){a.setState({filterObj:{sections:e.sectionList,filter:e.filterList,sDate:e.sDate,eDate:e.eDate,sort:e.sort}})},a.onSearch=function(e){a.setState({userQuery:e},(function(){a.queryData()}))},a.onPageChange=function(e){a.setState({page:e},(function(){a.queryData()}))},a.queryData=function(){""!==a.state.userQuery&&a.processFetch(a.state.userQuery)},a.adjustPagination=function(){for(var e=a.state.numOfArticle,t=[],n=[],r=Math.floor(e/10),i=a.state.offset,s=Math.floor(i/10),c=0;c<r&&c<100;c++)t[c]=c+1;var l=t.length-1;if(s>=4&&s<=94){var o=s-5,u=s+5;n=t.slice(o,u)}else s>94?n=t.slice(90,100):s<4&&(n=t.slice(0,10));a.setState({pagination:n,page:s,lastPage:l})},a.formatDate=function(e){return e.replace(/-/g,"")},a.processFetch=function(e){if(a.state.isFilterSearch){var t="",n="",r="relevance",i="",s="";if(""!==a.state.filterObj.sDate&&a.state.filterObj.eDate&&(t="&begin_date="+a.formatDate(a.state.filterObj.sDate),n="&end_date="+a.formatDate(a.state.filterObj.eDate)),""!==a.state.filterObj.sort&&(r="&sort="+a.state.filterObj.sort),"undefined"!=typeof a.state.filterObj.sections&&null!=a.state.filterObj.sections&&null!=a.state.filterObj.sections.length&&a.state.filterObj.sections.length>0){for(var c in i="section_name:(",a.state.filterObj.sections)i+='"'+a.state.filterObj.sections[c]+'"';i+=")"}if("undefined"!=typeof a.state.filterObj.filter&&null!=a.state.filterObj.filter&&null!=a.state.filterObj.filter.length&&a.state.filterObj.filter.length>0){for(var l in i.length>0&&(s=" AND"),s+=" type_of_material:(",a.state.filterObj.filter)s+='"'+a.state.filterObj.filter[l]+'"';s+=")"}fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+a.state.userQuery+"&fq="+i+s+t+n+r+"&page="+a.state.page+"&api-key="+y.getApiKey()).then((function(e){return e.json()})).then((function(e){a.setState({res:e.response,numOfArticle:e.response.meta.hits,offset:e.response.meta.offset,isReady:!0})}),(function(e){a.setState({err:e,isReady:!0})})).then((function(){return a.adjustPagination()}))}else fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+e+"&sort=relevance&page="+a.state.page+"&api-key="+y.getApiKey()).then((function(e){return e.json()})).then((function(e){a.setState({res:e.response,numOfArticle:e.response.meta.hits,offset:e.response.meta.offset,isReady:!0})}),(function(e){a.setState({err:e,isReady:!0})})).then((function(){return a.adjustPagination()}))},a.state={isReady:!1,isFilterSearch:!1,page:0,numOfArticle:0,offset:0,lastPage:0,userQuery:"",res:[],pagination:[],filterObj:{sections:[],filter:[],sDate:"",eDate:"",sort:""},err:null},a.queryData=a.queryData.bind(Object(m.a)(a)),a.adjustPagination=a.adjustPagination.bind(Object(m.a)(a)),a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(b,{retreiveData:this.onSearch}),this.state.isFilterSearch?r.a.createElement(v,{retreiveFilteredQuery:this.onFilterSearch,toggleFilter:this.state.isFilterSearch}):null,r.a.createElement("button",{className:"filter-btn",onClick:this.filterSearch},r.a.createElement(p.a,{icon:this.state.isFilterSearch?d.b:d.a})),this.state.isReady?r.a.createElement(h,{res:this.state.res}):null,this.state.isReady?r.a.createElement(g,{retreivePage:this.onPageChange,btnDetail:this.state.pagination,lastPage:this.state.lastPage}):null)}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render([r.a.createElement(E,null),r.a.createElement((function(){return r.a.createElement("footer",{className:"footer"},r.a.createElement("div",null,"New York Times article searcher"))}),null)],document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.c36216be.chunk.js.map