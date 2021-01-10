import logo from './logo.svg';
import './App.css';

import ARI from "./components/ARI"
import Duration from "./components/duration"

function App() {
  return (
    <div className="App">

      <div class="flex pb-96">
        <div class="flex-none w-96 p-2">

          <ARI />

          <Duration />
          
        </div>
        <div class="flex-grow h-16 bg-gray-200">
          map
        </div>
      </div>

    </div>
  );
}

export default App;
