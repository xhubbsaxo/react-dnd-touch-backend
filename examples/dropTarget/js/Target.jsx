'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const dragTarget = {
    drop(props, monitor, component) {
        const droppedItem = monitor.getItem();
        console.log('dropped on target', droppedItem);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Target extends Component {
    render () {
        const {
            connectDropTarget
        } = this.props;

        return connectDropTarget(
            <div className="target">
                Drop here!
                <div className="nested-child">Nested Child</div>
            </div>
        );
    }
}

Target.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget('draggable-item', dragTarget, collect)(Target);
