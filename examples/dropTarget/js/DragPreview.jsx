'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

function collect (monitor) {
    return {
        sourceOffset: monitor.getSourceClientOffset()
    };
}

class DragPreview extends Component {
    getLayerStyles() {
        const { sourceOffset } = this.props;

        return {
            transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
        };
    }

    render () {
        const { isDragging } = this.props;
        if (!isDragging) { return null; };

        return (
            <div className="source-preview" style={this.getLayerStyles()}>
                Dragging
            </div>
        );
    }
}

DragPreview.propTypes = {
    isDragging: PropTypes.bool,
    sourceOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
};

export default DragLayer(collect)(DragPreview);
