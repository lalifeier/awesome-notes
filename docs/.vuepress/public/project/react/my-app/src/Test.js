import React, { Component } from 'react'

class Cpn extends Component {
  render() {
    return <div>Cpn</div>
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
}

export default class Test extends Component {
  constructor() {
    super()
    console.log('constructor')

    this.state = {
      counter: 0,
      isShow: true,
    }
  }

  render() {
    console.log('render')
    return (
      <div>
        <h2> {this.state.counter}</h2>
        <button onClick={e => this.btnClick()}>btn</button>
        <hr />
        <button onClick={e => this.changeCpnShow()}>切换</button>
        {this.state.isShow && <Cpn />}
      </div>
    )
  }

  changeCpnShow() {
    this.setState({
      isShow: !this.state.isShow,
    })
  }

  btnClick() {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
  }
}
