import React from "react"
import { connect } from 'react-redux'
import { ARIYearsChange, ARIAEPdisplayToggle } from '../redux/reducers/core'

const allARIInYearsValues = [
  1.58,
  2,
  5,
  10,
  20,
  30,
  40,
  50,
  60,
  80,
  100,
  250,
]

const equivalentAEPValues = {
  1.58: 63.3,
  2: 50,
  5: 20,
  10: 10,
  20: 5,
  30: 3.3,
  40: 2.5,
  50: 2,
  60: 1.7,
  80: 1.2,
  100: 1,
  250: 0.4,
}


class ARI extends React.Component {
  handleSliderChange = (event) => {
    this.props.ARIYearsChange(allARIInYearsValues[event.target.value]);
  }

  handleARIAEPChange = (event) => {
    this.props.ARIAEPdisplayToggle();
  }

  ARIAEPdisplay = () => {
    if (this.props.display_ARI_or_AEP === 'ARI') {
      return <label htmlFor="ari_selector">{ this.props.ARI_years } years</label>;
    } else {
      return <label htmlFor="ari_selector">{ equivalentAEPValues[this.props.ARI_years] }%</label>;
    }
  }

  render() {
    return <div>
      <div>
        <span className="font-bold"><label htmlFor="ari_selector">{ this.props.display_ARI_or_AEP === 'ARI' ? 'Average Return Interval' : 'Annual Exceedance Probability' }</label></span> (or <span className="link" onClick={this.handleARIAEPChange}>use { this.props.display_ARI_or_AEP === 'ARI' ? 'AEP' : 'ARI' }</span>)
      </div>
      <div className="pl-3">
        <input type="range" id="ari_selector" min="0" max="11" defaultValue="3" className="mr-2" onChange={this.handleSliderChange} />
        <this.ARIAEPdisplay />
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return {
    ARI_years: state.core.ARI_years,
    display_ARI_or_AEP: state.core.display_ARI_or_AEP,
  };
};

export default connect(
  mapStateToProps,
  { ARIYearsChange, ARIAEPdisplayToggle }
)(ARI);
