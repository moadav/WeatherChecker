import React, { Component } from 'react';
import { ContentItem } from './ContentItem';

export class ContentItems extends Component {
    static displayName = ContentItems.name;

    render() {
        return (
            <div >
                <ContentItem name="Check Weatcher" link="/weather-search" />
            </div>

        );
    }
}