import React from "react"
import { connect } from 'react-redux'
import { ARIYearsChange } from '../redux/reducers/core'

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



class ARI extends React.Component {
  handleChange = (event) => {
    this.props.ARIYearsChange(allARIInYearsValues[event.target.value]);
  }

  //defaultValue should come from value of state
  render() {
    return <div>
      <div>
        <span className="font-bold"><label htmlFor="ari_selector">Average Return Interval</label></span> (or <a href="#a">use AEP</a>)
      </div>
      <div className="pl-3">
        <input type="range" id="ari_selector" min="0" max="11" defaultValue="5" className="mr-2" onChange={this.handleChange} />
        <label htmlFor="ari_selector">{ this.props.ARI_years } years</label>
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return { ARI_years: state.core.ARI_years };
};

export default connect(
  mapStateToProps,
  { ARIYearsChange }
)(ARI);
