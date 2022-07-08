import React, { Component } from 'react';
import { ContentItem } from './ContentItem';

export class ContentItems extends Component {
    static displayName = ContentItems.name;

    render() {
        return (
            <ContentItem name="Check Weather" />


        );
    }
}