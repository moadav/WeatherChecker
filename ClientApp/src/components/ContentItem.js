import React, { Component } from 'react';
import './ContentItem.css';
import { NavLink,Navigate } from 'react-router-dom';

export class ContentItem extends Component {
    static displayName = ContentItem.name;


    constructor(props) {
        super(props);
   
    }

    
    render() {
        return (
            <div className="frontpage">
                <NavLink to={this.props.link} replace={true} className="test"> {this.props.name }</NavLink>
         
                
            </div>

        );
    }
}
