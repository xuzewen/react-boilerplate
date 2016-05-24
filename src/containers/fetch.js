import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/fetch'
import { bindActionCreators } from 'redux'

let typelist = [
    {
        typeName: "social",
        name: "社会"
    },
    {
        typeName: "guonei",
        name: "国内"
    },
    {
        typeName: "world",
        name: "国际"
    },
    {
        typeName: "keji",
        name: "科技"
    },
    {
        typeName: "tiyu",
        name: "体育"
    }
]

export class Fetch extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
      this.props.actions.getNews()
  }
  
  changeType(typeName) {
      this.props.actions.changeType(typeName)
      this.props.actions.getNews(typeName)
  }

  render() {
    return (
        <div className="fetch">
            <div className="type-list">
                {
                    typelist.map((item, index) =>
                        <span key={index} className={item.typeName == this.props.typeName ? "active" : ''} onClick={this.changeType.bind(this, item.typeName)}>{item.name}</span>
                    )
                }
            </div>
            <ul>
            {
                this.props.newslist.map((item, index) =>
                    <li key={index}><img src={item.picUrl} /><a href={item.url}>{item.title}</a></li>
                )
            }
            </ul>
        </div>
    )
  }
}

//绑actions的第一种方法，在智能组件中绑定actions，并且只绑定要用到的actions
export default connect(state => ({
    newslist: state.fetch.newslist,
    error: state.fetch.error,
    typeName: state.fetch.typeName
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(Fetch)