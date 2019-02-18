/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';
import ListItem from './ListItem.jsx';
import Touch from '../../../src/Touch';
import {DragDropContext} from 'react-dnd';
import _ from 'lodash';

const generateData = (length) => {
    return _.chain(1)
        .range(length)
        .map((id) => {
            return {
                id: id,
                name: `Item-${id}`
            };
        })
        .value();
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: generateData(10)
        };
        this.handleReorder = this.handleReorder.bind(this);
    }

    handleReorder(dragInfo) {
        this.setState((prevState) => {
            const {items} = prevState;
            const draggedItem = items[dragInfo.itemIndex];

            const nextItems = [...items];
            nextItems.splice(dragInfo.itemIndex, 1);
            nextItems.splice(dragInfo.hoverItemIndex, 0, draggedItem);

            console.log(`reorder ${dragInfo.itemIndex} > ${dragInfo.hoverItemIndex}`, nextItems);

            return { items: nextItems };
        });
    }

    render() {
        const {items} = this.state;

        return (
            <div>
                <List
                    itemHeight={40}
                    onReorder={this.handleReorder}
                >
                    {_.map(items, (item) => {
                        return (
                            <ListItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                            />
                        )
                    })}
                </List>
            </div>
        );
    }
}

const options = {
    enableMouseEvents: true,
    enableHoverOutsideTarget: true
};

const DragDropContextApp = DragDropContext(Touch(options))(App);

ReactDOM.render(<DragDropContextApp/>, document.getElementById('main'));
