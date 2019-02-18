/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import classNames from 'classNames';

/**
 * The docs for the following functions can be found in
 * react-dnd's docs: http://gaearon.github.io/react-dnd/docs-overview.html
 */
const dragSource = {
    beginDrag (props) {
        return props;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class ListItem extends React.PureComponent {
    render () {
        const {
            id,
            name,
            connectDragSource,
            isOver,
            isDragging,
            topOffset
        } = this.props;

        const className = classNames('list-item', {
            'is-over': isOver,
            'is-dragging': isDragging
        });

        const style = {
            top: topOffset || 0,
            zIndex: isDragging ? 100 : 1
        };

        let content = (
            <li
                className={className}
                style={style}
            >
                {id} <a href="http://google.com">{name}</a>
            </li>
        );

        // Connect as drag source
        return connectDragSource(content);
    }
}

ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,

    // custom drag props
    topOffset: PropTypes.number,

    // react-dnd props
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    isOver: PropTypes.bool
};

export default DragSource('ListItem', dragSource, collect)(ListItem);
