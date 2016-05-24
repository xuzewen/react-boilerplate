import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/todo'
import { bindActionCreators } from 'redux'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import Filter from '../components/Filter'


export class Todo extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const actions = this.props.actions
        return (
            <div className="todo-list">
                <Header addItem={actions.addItem}/>
                <TodoList todoList={this.props.todoList} deleteItem={actions.deleteItem} filter={this.props.filter}/>
                <Filter setFilter={actions.setFilter}/>
            </div>
        )
    }
}



export default connect(state => ({
    todoList: state.todo.todoList,
    filter: state.todo.filter
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(Todo)