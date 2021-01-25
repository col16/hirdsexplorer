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


class ARI extends React.Component {
  handleChange = (event) => {
    this.props.durationHoursChange(allDurationInHoursValues[event.target.value]);
  }
  
  //defaultValue should come from value of state
  render() {
    return <div>
      <div>
        <span className="font-bold"><label htmlFor="ari_selector">Duration</label></span>
      </div>
      <div className="pl-3">
        <input type="range" id="ari_selector" min="0" max="11" defaultValue="5" className="mr-2" onChange={this.handleChange} />
        <label htmlFor="ari_selector">{ this.props.duration_hours } hours</label>
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
