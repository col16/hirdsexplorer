import { connect } from 'react-redux'

import './App.css';

import ARI from "./components/ARI"
import Duration from "./components/duration"
import LeafletMap from "./components/Map"
import AboutModal from "./components/AboutModal"
import { displayAboutModal } from './redux/reducers/core'

function App(props) {
  return (
    <div className="App">

      <AboutModal />

      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-none md:w-96 p-2" id="control-container">

          <ARI />

          <Duration />

          <div className="text-xs pt-3 pb-4 pl-0.5">
            Historical climate data plotted.
          </div>
          <div className="text-xs text-gray-600 pl-0.5 pt-2 border-solid border-t border-gray-100">
            <div>We can't take any liability for the accuracy of this data. Always treat <a href="https://hirds.niwa.co.nz/">the HIRDS website</a> as the source of truth.</div>
            <div className="pt-2"><span className="link" onClick={() => props.displayAboutModal()}>About this website</span></div>
          </div>

        </div>
        <div className="flex-grow bg-gray-200" id="map-container">
          <LeafletMap />
        </div>
      </div>

    </div>
  );
}

export default connect(
  null,
  { displayAboutModal }
)(App);
