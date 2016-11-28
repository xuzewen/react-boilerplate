import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/counter'
import { bindActionCreators } from 'redux'

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(() => this.tick(), this.props.frequency);
  }
  
  tick() {
    if(this.props.stop) return
    this.props.actions.setInit(this.props.init + this.props.step)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  reset() {
    let step = Number(this.refs.step.value)
    
    if(step){
      this.props.actions.setStep(step)
    }
    
  }
  
  stop() {
    this.props.actions.stop()
  }
  
  start() {
    this.props.actions.start()
  }

  render() {
    return (
      <div className="counter">
        <h1 className="red">计数器</h1>
        <h2>
          计数 (累加{this.props.step}): {this.props.init}
        </h2>
        累加：<input type="text" defaultValue="1" ref="step"/>
        <br />
        <input type="button" value="确定" onClick={this.reset.bind(this)}/>
        <input type="button" value={this.props.stop? '开始' : '暂停'} onClick={this.props.stop ? this.start.bind(this) : this.stop.bind(this)}/>
      </div>
    );
  }
}

//绑actions的第一种方法，在智能组件中绑定actions，并且只绑定要用到的actions
export default connect(state => ({
  init: state.counter.init,
  step: state.counter.step,
  frequency: state.counter.frequency,
  stop: state.counter.stop
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(Counter)