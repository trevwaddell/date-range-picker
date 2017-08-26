import React, { Component } from 'react';

import { css } from 'glamor';

const dayStyles = css({
  width: 'calc(100%/7)',
  ':hover': {
    cursor: 'pointer',
  },
  textAlign: 'center',
});

const Day = props =>
  (<div className="day" style={props.styles} {...dayStyles} onClick={props.onDaySelect}>
    {props.day}
  </div>);

export default Day;
