import { Link } from 'gatsby'
import React, { useState } from 'react'

import * as styles from './SurgeBanner.module.scss'

const SurgeBanner = () => {
  const [closed, setClosed] = useState(false)

  return (
    <>
      {!closed && (
        <div className={styles.banner}>
          <div className={styles.container}>
            <Link to='/search/?filters=%7B"covid_tags"%3A%5B"Surge+resilience+and+recovery"%2C"Medical+surge+capacity"%2C"Surge+supply+management"%2C"Health+system+surge+capacity"%5D%7D&page=1&pagesize=10&search_text=&show_overlay=false&order_by=date&is_desc=true'>
              Click here to view documents relating to Surge Capacity
            </Link>
            <button onClick={() => setClosed(true)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default SurgeBanner
