import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <div>
    <SEO title="Home" />

    <div class="flex pb-96">
      <div class="flex-none w-96 p-2">

        <div>
          <div><span class="font-bold"><label for="ari_selector">Average Return Interval</label></span> (or <a href="#">use AEP</a>)</div>
          <div class="pl-3">
            <input type="range" id="ari_selector" min="0" max="11" value="5" class="mr-2" />
            <label for="ari_selector">100 years</label>
          </div>
        </div>

        <div>
          <div class="font-bold"><label for="duration_selector">Duration</label></div>
          <div class="pl-3">
            <input type="range" id="duration_selector" min="0" max="11" value="5" class="mr-2" />
            <label for="duration_selector">24 hours</label>
          </div>
        </div>
        

      </div>
      <div class="flex-grow h-16 bg-gray-200">
        map
      </div>
    </div>

  </div>
)

export default IndexPage
