import React, { Component } from 'react';

import Calendar from './Calendar';

const now = new Date();

class DateRangePicker extends Component {
  constructor() {
    super();

    this.state = {
      selected_dt: null,
      start_dt: null,
      end_dt: null,
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    };
  }

  changeMonth(delta) {
    this.setState({ month: this.state.month + delta });
  }

  render() {
    const { year, month, day } = this.state;
    return (
      <div>
        <button
          onClick={() => {
            this.changeMonth(-1);
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            this.changeMonth(1);
          }}
        >
          forward
        </button>
        <Calendar year={year} month={month} />
        <br />
        <Calendar year={year} month={month + 1} />
      </div>
    );
  }
}

export default DateRangePicker;
