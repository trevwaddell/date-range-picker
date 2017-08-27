import React, { Component } from 'react';

import { css } from 'glamor';

const dayStyles = css({
  width: 'calc(100%/7)',
  ':hover': {
    cursor: 'pointer',
  },
  textAlign: 'center',
});

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getDate = this.getDate.bind(this);
    this.isToday = this.isToday.bind(this);
  }

  componentDidMount() {
    console.log(this.isToday());
  }

  getDate() {
    const { year, month, day } = this.props;
    return new Date(year, month, day).setHours(0, 0, 0, 0);
  }

  isToday() {
    return this.getDate() === new Date().setHours(0, 0, 0, 0);
  }

  render() {
    return (
      <div
        className={`day ${this.isToday() ? 'today' : ''}`}
        style={this.props.styles}
        {...dayStyles}
        onClick={this.props.onDaySelect}
      >
        {this.props.day}
      </div>
    );
  }
}

export default Day;
