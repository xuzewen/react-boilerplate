import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import { Counter } from './counter';
import { List } from './list';



export class App extends Component {
  render() {
    return (
      <div>
        <h1 className="red">计数器</h1>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <h2>这是APP模块加载的list</h2>
        <List/>
        
      </div>
    );
  }
}