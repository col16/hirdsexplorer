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
          
        </div>
        <div className="flex-grow h-16 bg-gray-200">
          map
        </div>
      </div>

    </div>
  );
}

export default App;
