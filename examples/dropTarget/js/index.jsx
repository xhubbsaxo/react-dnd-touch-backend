'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { default as Touch } from '../../../src/Touch';
import DragDropContext from 'react-dnd/lib/DragDropContext';
import Source from './Source.jsx';
import Target from './Target.jsx';
import NestedTarget from './NestedTarget.jsx';

function App () {
    return (
        <div>
            <Source value={2}/>
            <Source value={15}/>
            <Target />

            <NestedTarget name="nt01" message="I will add 1" changeFunction={(value) => value + 1}>
                <NestedTarget name="nt02" message="I will multiply by 2" changeFunction={(value) => value * 2} />
                <NestedTarget name="nt03" message="I will multiply by 10" changeFunction={(value) => value * 10}>
                    <NestedTarget name="nt04" message="I will add 3" changeFunction={(value) => value + 3} />
                </NestedTarget>
            </NestedTarget>
        </div>
    );
}

App = DragDropContext(Touch({ enableMouseEvents: true }))(App);
ReactDOM.render(<App />, document.getElementById('app'));
