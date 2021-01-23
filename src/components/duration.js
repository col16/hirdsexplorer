import React from "react"

const Duration = () => (
  <div>
    <div className="font-bold"><label htmlFor="duration_selector">Duration</label></div>
    <div className="pl-3">
      <input type="range" id="duration_selector" min="0" max="11" defaultValue="5" className="mr-2" />
      <label htmlFor="duration_selector">24 hours</label>
    </div>
  </div>
)

export default Duration
