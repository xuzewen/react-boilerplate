import React, { Component } from 'react'
import Counter  from './counter'
import Todo from './todo'
import Fetch from './fetch'



export class App extends Component {
  render() {
    return (
      <div>
        <Counter />
        <Todo />
        <Fetch />
      </div>
    )
  }
}