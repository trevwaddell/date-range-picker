import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Day from './Day';

// TODO: Move to Constants file
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

// TODO: use external css, maybe styled-jsx
const flexRow = css({
  display: 'flex',
  flexDirection: 'row',
});

const dayStyles = css({
  width: 'calc(100%/7)',
  textAlign: 'center',
});

const monthStyles = css({
  flexWrap: 'wrap',
});

const propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  selectedDates: PropTypes.objectOf(PropTypes.date),
  handleDateSelect: PropTypes.func,
};

const defaultProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  selectedDates: {},
  handleDateSelect() {},
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredDate: null,
    };

    this.handleDateSelect = this.handleDateSelect.bind(this);
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
    return day === 1 ? { marginLeft: `calc((100%/7) * ${date.getDay()})` } : { marginLeft: '0px' };
  }

  daysInThisMonth(year, month) {
    const d = new Date(year, month + 1, 0);
    return d.getDate();
  }

  handleDateSelect(year, month, day) {
    this.props.handleDateSelect(year, month, day);
  }

  render() {
    const { year, month, selectedDates } = this.props;
    return (
      <div className="calendar" style={{ width: '48%', border: '1px solid' }}>
        <div className="month-name" style={{ textAlign: 'center' }}>
          {monthsLong[this.props.month]} {this.props.year}
        </div>
        <div className="weekdays" {...flexRow}>
          {daysOfWeek.map((day, i) =>
            (<div key={`${day}-${i}`} className="week-day" {...dayStyles}>
              {day}
            </div>),
          )}
        </div>
        <div className="month" {...flexRow} {...monthStyles}>
          {this.getDays().map((day, i) =>
            (<Day
              key={day}
              day={day}
              month={month}
              year={year}
              styles={this.getDayStyles(day)}
              selectedDates={this.props.selectedDates}
              onDaySelect={() => {
                this.handleDateSelect(year, month, day);
              }}
            />),
          )}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
