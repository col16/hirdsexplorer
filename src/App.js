import './App.css';

import ARI from "./components/ARI"
import Duration from "./components/duration"

function App() {
  return (
    <div className="App">

      <div className="flex pb-96">
        <div className="flex-none w-96 p-2">

          <ARI />

          <Duration />

          <div className="text-xs text-gray-600 pt-3 pl-0.5">
            We can't take any liability for the accuracy of this data. Always treat <a href="https://hirds.niwa.co.nz/">the HIRDS website</a> as the source of truth.
          </div>
          <div className="text-xs pl-0.5 pt-1">
            <a href="/about/">About this website</a>
          </div>
          
        </div>
        <div className="flex-grow h-16 bg-gray-200">
          map
        </div>
      </div>

    </div>
  );
}

export default App;
