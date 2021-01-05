import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"
import ARI from "../components/ARI"
import Duration from "../components/duration"

const IndexPage = () => (
  <div>
    <SEO title="Home" />

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
)

export default IndexPage
