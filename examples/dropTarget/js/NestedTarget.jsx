'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const dragNestedTarget = {
    drop(props, monitor, component) {
        let droppedItem = monitor.getDropResult();

        if (!droppedItem) {droppedItem = monitor.getItem();}

        droppedItem = {
            value: props.changeFunction(droppedItem.value)
        };

        console.log(props.message, droppedItem);

        return droppedItem;
    },
    hover(props, monitor, component) {
        component.setState({ hasBeenHovered: true });
        clearTimeout(component.timeout);
        component.timeout = setTimeout(() => {
            component.setState({ hasBeenHovered: false });
        }, 1000);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class NestedTarget extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            hasBeenHovered: false
        }
    }
    componentWillUnmount () {
        clearTimeout(this.timeout);
    }
    render () {
        const {
            connectDropTarget
        } = this.props;

        return connectDropTarget(
            <div className={'target nested'}>
                {this.props.message}
                {this.state.hasBeenHovered ? this.props.children : null}
            </div>
        );
    }
}

NestedTarget.propTypes = {
    message: PropTypes.string.isRequired,
    changeFunction: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget('draggable-item', dragNestedTarget, collect)(NestedTarget);
