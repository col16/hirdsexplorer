import React from "react"

const Duration = () => (
  <div>
    <div class="font-bold"><label for="duration_selector">Duration</label></div>
    <div class="pl-3">
      <input type="range" id="duration_selector" min="0" max="11" value="5" class="mr-2" />
      <label for="duration_selector">24 hours</label>
    </div>
  </div>
)

export default Duration
