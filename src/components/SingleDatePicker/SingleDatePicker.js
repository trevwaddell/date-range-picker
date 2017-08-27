import React, { Component } from 'react';

import Calendar from '../Calendar/Calendar';

class SingleDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Calendar handleDateSelect={() => true} year={2017} month={0} />
      </div>
    );
  }
}

export default SingleDatePicker;
