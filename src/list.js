import './css/css.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { List } from './components/list';

class Meun extends Component {
    render () {
        return (
            <div>
                <h1 className="middle">这是list页面</h1>
                <h2 className="blue">这是入口index加载的list</h2>
                <List />
            </div> 
        );
    }
}

render(<App />, document.getElementById('root'));
render(<Meun />, document.getElementById('list'));