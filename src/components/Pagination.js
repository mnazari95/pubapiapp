import React from 'react';

export class Pagination extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lastPage: 0,
            getPage: 0,
            pages: [],
        }

        this.sendPage = this.sendPage.bind(this);

    }

    static getDerivedStateFromProps(props, state){
        return {
            pages: props.btnDetail,
            lastPage: props.lastPage
        };
    }

    sendPage = event => {
        
        this.setState(
            {
                getPage: event.target.value
            },
            ()=> {this.props.retreivePage(this.state.getPage);}
        );
        
    }

    render() {

        return(
            <div className="page-list">
                <button className="page-item" onClick={this.sendPage} value={0}>FIRST</button>
                {(this.state.pages).map((pagBtn, i) => (
                <button key={i} className="page-item" onClick={this.sendPage} value={pagBtn-1}>{pagBtn}</button>
                ))}
                <button className="page-item" onClick={this.sendPage} value={this.state.lastPage}>LAST</button>
            </div>
        );
    }
}