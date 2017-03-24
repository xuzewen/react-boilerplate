import React, { Component } from 'react'
import Counter  from './counter'
import Todo from './todo'
import Fetch from './fetch'


export default class List extends Component {
  render() {
    return (
      <div>
        <Fetch />
      </div>
    )
  }
}