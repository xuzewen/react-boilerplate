import React, { Component } from 'react';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h2>
          计数 (累加{this.props.increment}): {this.state.counter}
        </h2>
        数量：<input type="text"/>
        <br />
        频率：<input type="text"/>（毫秒）
        <br />
        <input type="button" value="确定"/>
      </div>
    );
  }
}