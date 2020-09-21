import React from 'react'

import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 style={{ textAlign: 'center' }}>404 - Page not found</h1>
  </Layout>
)

export default NotFoundPage
