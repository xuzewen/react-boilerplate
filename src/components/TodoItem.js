import React, { Component } from 'react'

export default class TodoItem extends Component {
    constructor(props) {
        super(props)
    }
    
    handleClick() {
        this.props.deleteItem(this.props.item)
    }
    
    render () {
        return(
            <li>
                <span>{this.props.item.index + '号' + this.props.item.text}</span><input type="button" defaultValue="删除" onClick={this.handleClick.bind(this)}/>
            </li>
        )
    }
}