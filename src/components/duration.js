import React from "react"
import { connect } from 'react-redux'
import { durationHoursChange } from '../redux/reducers/core'

const allDurationInHoursValues = [
  10/60,
  20/60,
  30/60,
  1,
  2,
  6,
  12,
  24,
  48,
  72,
  96,
  120,
]

let friendlyDurationValues = {
  1: '1 hour',
  2: '2 hours',
  6: '6 hours',
  12: '12 hours',
  24: '24 hours',
  48: '48 hours (2 days)',
  72: '72 hours (3 days)',
  96: '96 hours (4 days)',
  120: '120 hours (5 days)',
}
friendlyDurationValues[10/60] = '10 minutes';
friendlyDurationValues[20/60] = '20 minutes';
friendlyDurationValues[30/60] = '30 minutes';


class ARI extends React.Component {
  handleChange = (event) => {
    this.props.durationHoursChange(allDurationInHoursValues[event.target.value]);
  }

  render() {
    return <div>
      <div>
        <span className="font-bold"><label htmlFor="duration_selector">Duration</label></span>
      </div>
      <div className="pl-3">
        <input type="range" id="duration_selector" min="0" max="11" defaultValue="3" className="mr-2" onChange={this.handleChange} />
        <label htmlFor="duration_selector">{ friendlyDurationValues[this.props.duration_hours] }</label>
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return { duration_hours: state.core.duration_hours };
};

export default connect(
  mapStateToProps,
  { durationHoursChange }
)(ARI);
