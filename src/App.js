import './App.css';

import ARI from "./components/ARI"
import Duration from "./components/duration"
import LeafletMap from "./components/Map"

function App() {
  return (
    <div className="App">

      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-none md:w-96 p-2" id="control-container">

          <div>Plotting historical data</div>

          <ARI />

          <Duration />

          <div className="text-xs text-gray-600 pt-3 pb-1 pl-0.5">
            We can't take any liability for the accuracy of this data. Always treat <a href="https://hirds.niwa.co.nz/">the HIRDS website</a> as the source of truth.
          </div>
          <div className="text-xs pl-0.5 pt-0.5 border-solid border-t border-gray-100">
            <a href="/about/">About this website</a>
          </div>
          
        </div>
        <div className="flex-grow bg-gray-200" id="map-container">
          <LeafletMap />
        </div>
      </div>

    </div>
  );
}

export default App;
