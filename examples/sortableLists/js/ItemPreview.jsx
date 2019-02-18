/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

function collect (monitor) {
    const item = monitor.getItem();
    return {
        id: item && item.id,
        name: item && item.name,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    const x = currentOffset.x;
    const y = currentOffset.y;
    const transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

function ItemPreview ({
    id,
    name,
    isDragging,
    currentOffset
}) {
    if (!isDragging) {
        return <li></li>;
    }

    return (
        <div
            className="item preview"
            style={getItemStyles(currentOffset)}
        >
            {id} {name}
        </div>
    );
}

ItemPreview.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    isDragging: PropTypes.bool
};

export default DragLayer(collect)(ItemPreview);
