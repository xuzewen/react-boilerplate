import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <ul>
                {
                    this.props.todoList.map((item,index) =>{
                            if(this.props.filter == ''){
                                return <TodoItem key={index} item={item} deleteItem={this.props.deleteItem}/> 
                            }else if(this.props.filter && (item.index+'').indexOf(this.props.filter) != -1){
                                return <TodoItem key={index} item={item} deleteItem={this.props.deleteItem}/> 
                            }
                        }
                    )
                }
            </ul>
        )
    }
}