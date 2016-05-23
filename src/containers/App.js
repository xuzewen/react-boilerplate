import React, { Component } from 'react'
import { Counter } from '../components/counter'



export class App extends Component {
  render() {
    return (
      <div>
        <h1 className="red">计数器</h1>
        <Counter increment={1} />
      </div>
    )
  }
}