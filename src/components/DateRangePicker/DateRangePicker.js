import React, { Component } from 'react';
import { css } from 'glamor';

import Calendar from '../Calendar/Calendar';

const now = new Date();

const active = {
  background: 'rgb(249,99,2)',
  padding: '5px',
  color: '#fff',
};

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
      dateChoice: null,
      show: false,
    };

    this.setDate = this.setDate.bind(this);
    this.getDateString = this.getDateString.bind(this);
    this.changeDateChoice = this.changeDateChoice.bind(this);
  }

  setDate(year, month, day) {
    const { startDate, endDate, dateChoice } = this.state;
    const date = new Date(year, month, day);
    const newState = {};

    if (dateChoice === 'start') {
      if (endDate && date > endDate) {
        newState.endDate = null;
      }
      newState.startDate = date;
      newState.dateChoice = 'end';
    } else if (dateChoice === 'end') {
      if (startDate && date < startDate) {
        newState.startDate = date;
      } else {
        newState.endDate = date;
        newState.dateChoice = null;
        newState.show = false;
      }
    }
    this.setState(newState);
  }

  getDateString(date) {
    return new Date(date).toLocaleDateString();
  }

  changeMonth(delta) {
    const { year, month } = this.state;
    const newState = {};
    if (delta < 0 && this.state.month === 0) {
      newState.month = 11;
      newState.year = year - 1;
    } else if (delta > 0 && this.state.month === 11) {
      newState.month = 0;
      newState.year = year + 1;
    } else {
      newState.month = month + delta;
    }
    this.setState(newState);
  }

  changeDateChoice(dateChoice) {
    this.setState({
      dateChoice,
      show: true,
    });
  }

  render() {
    const { year, month, startDate, endDate, dateChoice } = this.state;
    return (
      <div className="date-range-picker">
        <div className="dates-display" style={{ display: 'flex' }}>
          <div
            onClick={() => {
              this.changeDateChoice('start');
            }}
            style={dateChoice === 'start' ? active : { padding: '5px' }}
          >
            {startDate ? this.getDateString(startDate) : 'Start Date'}
          </div>
          <div style={{ padding: '5px' }}>&rarr;</div>
          <div
            onClick={() => {
              this.changeDateChoice('end');
            }}
            style={dateChoice === 'end' ? active : { padding: '5px' }}
          >
            {endDate ? this.getDateString(endDate) : 'End Date'}
          </div>
        </div>
        {this.state.show
          ? <div>
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
            <div
              className="calendars"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Calendar year={year} month={month} handleDateSelect={this.setDate} />
              <br />
              {this.state.month === 11
                ? <Calendar year={year + 1} month={0} handleDateSelect={this.setDate} />
                : <Calendar year={year} month={month + 1} handleDateSelect={this.setDate} />}
            </div>
          </div>
          : null}
      </div>
    );
  }
}

export default DateRangePicker;

//
