import React, { Component } from 'react';
import { css } from 'glamor';

import Day from './Day';

const currentDate = new Date();
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthsLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const flexRow = css({
  display: 'flex',
  flexDirection: 'row',
});

const dayStyles = css({
  width: 'calc(100%/7)',
});

const monthStyles = css({
  flexWrap: 'wrap',
});

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: null,
    };
  }

  componentDidMount() {
    this.getDays();
  }

  getDays() {
    const { year, month } = this.props;
    const numDays = this.daysInThisMonth(year, month);
    const days = [];
    for (let i = 1; i <= numDays; i += 1) {
      days.push(i);
    }
    return days;
  }

  getDayStyles(day) {
    const { year, month } = this.props;
    const date = new Date(year, month, day);
    return day == 1 ? { marginLeft: `calc((100%/7) * ${date.getDay()})` } : { marginLeft: '0px' };
  }

  daysInThisMonth(year, month) {
    const d = new Date(year, month + 1, 0);
    return d.getDate();
  }

  handleDateSelect() {}

  render() {
    return (
      <div className="calendar">
        <div className="month-name">
          {monthsLong[this.props.month]}
        </div>
        <div className="weekdays" {...flexRow}>
          {daysOfWeek.map((day, i) =>
            (<div key={`${day}-${i}`} className="week-day" style={{ width: 'calc( 100%/7 )' }}>
              {day}
            </div>),
          )}
        </div>
        <div className="month" {...flexRow} {...monthStyles}>
          {this.getDays().map((day, i) =>
            <Day key={day} day={day} styles={this.getDayStyles(day)} />,
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;
