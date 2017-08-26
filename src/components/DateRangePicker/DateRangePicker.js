import React, { Component } from 'react';

import Calendar from './Calendar';

const now = new Date();

class DateRangePicker extends Component {
  constructor() {
    super();

    this.state = {
      selectedDate: null,
      startDate: null,
      endDate: null,
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    };

    this.setDate = this.setDate.bind(this);
  }

  // Todo: do this differently ?
  setDate(year, month, day) {
    const { startDate } = this.state;
    const newState = {};
    const date = new Date(year, month, day);

    if (startDate) {
      if (startDate >= date) {
        newState.startDate = date;
      } else {
        newState.endDate = date;
      }
    } else {
      newState.startDate = date;
    }
    this.setState(newState);
  }

  changeMonth(delta) {
    if (delta < 0 && this.state.month === 0) {
      this.setState({
        month: 11,
        year: this.state.year - 1,
      });
    } else if (delta > 0 && this.state.month === 11) {
      this.setState({
        month: 0,
        year: this.state.year + 1,
      });
    } else {
      this.setState({
        month: this.state.month + delta,
      });
    }
  }

  render() {
    const { year, month } = this.state;
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
        <div className="calendars" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Calendar
            year={year}
            month={month}
            handleDateSelect={this.setDate}
            selectedDate={() => true}
          />
          <br />
          {this.state.month === 11
            ? <Calendar
              year={year + 1}
              month={0}
              handleDateSelect={this.setDate}
              selectedDate={() => true}
            />
            : <Calendar
              year={year}
              month={month + 1}
              handleDateSelect={this.setDate}
              selectedDate={() => true}
            />}
        </div>
      </div>
    );
  }
}

export default DateRangePicker;

//
