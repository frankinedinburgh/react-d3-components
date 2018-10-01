import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './styles.css'

class CongressionalState extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    range: PropTypes.number
  }

  constructor(props) {
    super(props)

    this._line = this._line.bind(this)
    this._circle = this._circle.bind(this)

    this.margin = {top: 150, right: 150, bottom: 150, left: 150}
    this.width = this.props.width - this.margin.left - this.margin.right
    this.height = this.props.height - this.margin.top - this.margin.bottom
    this.data = d3.range(this.props.range).map((d) => ({ 'y': d3.randomUniform(1)() }))

    this.xScale = d3.scaleLinear()
      .domain([0, this.props.range - 1])
      .range([0, this.width])

    this.yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([this.height, 0])
  }

  _line() {
    const xScale = d3.scaleLinear()
      .domain([0, this.props.range - 1])
      .range([0, this.width])

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([this.height, 0])

    let line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX)

    return (
      <path className={styles.line} d={line([...this.data])} />
    )
  }

  _circle() {
    let _xScale = d3.scaleLinear()
      .domain([0, this.props.range - 1]) // input
      .range([0, this.width]) // output

    let _yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([this.height, 0])

    return (
      this.data.map((d, index) => (
        <circle key={`circle_${index}`} className={styles.dot} cx={_xScale(index)} cy={_yScale(d.y)} r={5} />
      ))
    )
  }

  render() {
    return (
      <svg className={styles.overlay}
        width={this.props.width}
        height={this.props.height}>
        <g transform={'translate(' + this.margin.left + ',' + this.margin.top + ')'}>
          <g className={'x axis'}
            transform={'translate(0,' + this.height + ')'}
            ref={node => d3.select(node).call(d3.axisBottom(this.xScale))} />
          <g className={'y axis'}
            ref={node => d3.select(node).call(d3.axisLeft(this.yScale))} />
          { this._line()}
          { this._circle()}
        </g>
      </svg>
    )
  }
}

export default CongressionalState
