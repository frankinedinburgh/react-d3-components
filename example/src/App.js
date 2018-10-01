import React, { Component } from 'react'

import CongressionalStates from 'react-d3-components'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.onReize = this.onReize.bind(this)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onReize, true)
  }

  onReize(evt) {
    console.log(this.state.width)
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  render () {
    const {width, height} = this.state // Use the window's width

    return (
      <CongressionalStates range={10} width={width} height={height} />
    )
  }
}
