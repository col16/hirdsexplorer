import React from "react"

const ARI = () => (
  <div>
    <div>
      <span class="font-bold"><label for="ari_selector">Average Return Interval</label></span> (or <a href="#">use AEP</a>)
    </div>
    <div class="pl-3">
      <input type="range" id="ari_selector" min="0" max="11" value="5" class="mr-2" />
      <label for="ari_selector">100 years</label>
    </div>
  </div>
)

export default ARI
