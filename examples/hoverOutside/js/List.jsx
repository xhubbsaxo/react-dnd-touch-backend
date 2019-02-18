/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import ListItem from './ListItem.jsx';
import _ from 'lodash';

/**
 * The docs for the following functions can be found in
 * react-dnd's docs: http://gaearon.github.io/react-dnd/docs-overview.html
 */
const dropTarget = {
    drop(props, monitor, component) {
        const { dragInfo } = component.state;
        const { onReorder } = component.props;

        component.setState({
            dragInfo: null
        });

        if (dragInfo.itemIndex !== dragInfo.hoverItemIndex) {
            onReorder(dragInfo);
        }
    },


    hover(props, monitor, component) {
        const dragItem = monitor.getItem();
        const {el} = component;

        // Determine mouse position
        const sourceClientOffset = monitor.getSourceClientOffset();

        if (!(component && dragItem && sourceClientOffset && el)) {
            return;
        }

        const {children, itemHeight} = component.props;

        // Find item index
        const items = React.Children.toArray(children);
        const itemIndex = _.findIndex(items, (child) => child.props.id === dragItem.id);

        // Get bounds of target area
        const targetBoundingRect = el.getBoundingClientRect();
        const mousePosition = sourceClientOffset.y - targetBoundingRect.top;
        const dragOffset = mousePosition - itemIndex * itemHeight;
        const hoverItemIndex = Math.max(0, Math.min(Math.round(mousePosition / itemHeight), items.length - 1));

        // Notify list about dragging
        component.setState({
            dragInfo: {
                itemId: dragItem.id,
                itemIndex,
                hoverItemIndex,
                dragOffset
            }
        });
    }
};

function collect(connect, monitor) {
    return {
        isOver: monitor.isOver({shallow: true}),
        connectDropTarget: connect.dropTarget()
    };
}

export class List extends React.Component {
    constructor(props) {
        super(props);

        this.el = null;
        this.state = {
            dragInfo: null
        };

        this.handleRef = this.handleRef.bind(this);
    }

    handleRef(el){
        this.el = el;
    }

    render() {
        const {
            children,
            connectDropTarget,
            itemHeight
        } = this.props;

        const {dragInfo} = this.state;

        const items = _.map(React.Children.toArray(children), (item, itemIndex) => {
            if (!dragInfo) {
                return item;
            }

            if (dragInfo.itemId === item.props.id) {
                return React.cloneElement(item, {topOffset: dragInfo.dragOffset});
            }

            if (itemIndex <= dragInfo.hoverItemIndex && dragInfo.itemIndex < itemIndex) {
                return React.cloneElement(item, {topOffset: -itemHeight});
            }

            if (itemIndex >= dragInfo.hoverItemIndex && dragInfo.itemIndex > itemIndex) {
                return React.cloneElement(item, {topOffset: itemHeight});
            }

            return item;
        });

        return connectDropTarget(
            <ul className="list" ref={this.handleRef}>
                {items}
            </ul>
        );
    }
}

List.propTypes = {
    itemHeight: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.shape({
            type: PropTypes.oneOf([ListItem])
        }),
        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf([ListItem])
            })
        )
    ]).isRequired,

    // custom drag props
    dragInfo: PropTypes.shape({
        itemId: PropTypes.string,
        itemIndex: PropTypes.number,
        dragOffset: PropTypes.number
    }),

    onReorder: PropTypes.func,

    // react-dnd props
    connectDropTarget: PropTypes.func
};

export default DropTarget('ListItem', dropTarget, collect)(List);
