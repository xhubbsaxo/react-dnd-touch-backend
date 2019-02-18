'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import DragPreview from './DragPreview.jsx';

const dragSource = {
    beginDrag (props) {
        return props;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

class Source extends Component {
    render () {
        const {
            connectDragSource
        } = this.props;

        return connectDragSource(
            <div className="source">
                <DragPreview {...this.props} />
                Drag me!
                <pre>{this.props.value}</pre>
            </div>
        );
    }
}

Source.propTypes = {
    value: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
};

export default DragSource('draggable-item', dragSource, collect)(Source);
