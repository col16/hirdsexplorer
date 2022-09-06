import React from "react"
import { connect } from 'react-redux'
import { transparencyChange } from '../redux/reducers/core'

let friendlyValues = {
  0: 'Visible',
  0.5: '50% visible',
  1: 'Hidden',
}


class Transparency extends React.Component {
  handleChange = (event) => {
    this.props.transparencyChange(event.target.value);
  }

  render() {
    return <div>
      <div>
        <span className="font-bold"><label htmlFor="transparency_selector">Aerial imagery</label></span>
      </div>
      <div className="pl-3">
        <input type="range" id="transparency_selector" min="0" max="1" step="0.5" defaultValue="1" className="mr-2" onChange={this.handleChange} />
        <label htmlFor="transparency_selector">{ friendlyValues[this.props.transparency] }</label>
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return { transparency: state.core.transparency };
};

export default connect(
  mapStateToProps,
  { transparencyChange }
)(Transparency);
