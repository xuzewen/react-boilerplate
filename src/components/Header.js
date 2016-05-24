import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    
    handleClick() {
        let text = this.refs.text.value
        this.props.addItem(text)
    }
    
    render() {
        return (
            <div>
                <h2>TODO LIST</h2>
                <input type="text" ref="text"/>
                <input type="button" defaultValue="添加" onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}