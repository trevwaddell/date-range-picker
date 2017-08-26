import React from 'react';

import { css } from 'glamor';

const dayStyles = css({
  width: 'calc(100%/7)',
});

const Day = (props) => {
  const foo = props.day;
  return (
    <div className="day" style={props.styles} {...dayStyles}>
      {props.day}
    </div>
  );
};

export default Day;
