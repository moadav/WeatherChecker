import React, { Component } from 'react';
import './ContentItem.css';

export class ContentItem extends Component {
    static displayName = ContentItem.name;


    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <p> {this.props.name } </p>
    );
    }
}