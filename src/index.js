import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CongressionalState from './App'

class CongressionalDistricts extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    range: PropTypes.number
  }

  render() {
    return (
      <CongressionalState range={this.props.range} height={this.props.height} width={this.props.width} />
    )
  }
}

export default CongressionalDistricts
