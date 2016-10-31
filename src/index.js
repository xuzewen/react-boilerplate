import './css/css.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { List } from './components/list';

class Meun extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.state.c = function(){
            alert('c')
        }
    }

    componentDidMount(){
        this.setState({
            c:function(){
                alert('c2')
            }
        })
    }

    a(){
        alert('a')
    }

    b(){
        alert('b')

        console.log(this.refs)
    }

    render () {
        return (
            <div>
                <h1 className="middle" onClick={this.a} onClick={this.b.bind(this)} onClick={this.state.c.bind(this)}ref='a'>这是index页面</h1>
                <h2 className="blue" ref='a'>这是入口index加载的list</h2>
                <List />
            </div> 
        );
    }
}

render(<App />, document.getElementById('root'));
render(<Meun />, document.getElementById('list'));