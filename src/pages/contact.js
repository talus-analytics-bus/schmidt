// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import { PrimaryButton } from '../components/common'
import MobileDisclaimer from '../components/MobileDisclaimer/MobileDisclaimer'

// local utility functions
import { withBookmarkedIds } from '../components/misc/Util'

// styles and assets
import styles from '../components/Contact/contact.module.scss'

const Contact = ({}) => {
  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [submitButtonText, setSubmitButtonText] = React.useState('Submit')

  const handleSubmit = event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    const emptyfields = Object.values(data).some(field => field === '')

    if (emptyfields) {
      setErrorMessage(
        <div className={styles.error}>
          Some required fields above are not filled in, please complete before
          submitting.
        </div>
      )
    } else {
      data['subject'] = 'New message from Schmidt'
      data['site'] = 'schmidt'
      setErrorMessage('')
      setSubmitButtonText('Submitting...')
      axios
        .post(
          'https://9a8pmml6ca.execute-api.us-east-1.amazonaws.com/submit',
          JSON.stringify(data),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          setSuccessMessage(
            <div className={styles.success}>Feedback Submitted</div>
          )
          setSubmitButtonText('Submit')
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(
            <div className={styles.error}>
              There was an error submitting your request, please check your
              network connection and try again.
            </div>
          )
        })
    }
  }

  // ids of bookmarked items to count for nav
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
    setLoading(false)
  }, [bookmarkedIds])

  // JSX
  return (
    <Layout
      page={'contact'}
      loading={loading}
      bookmarkCount={loading ? null : bookmarkedIds.length}
    >
      <SEO title="Contact" />
      <div className={styles.contact}>
        <header className={styles.header}>
          <h1>Contact us</h1>
        </header>

        <form
          className={styles.main}
          onSubmit={handleSubmit}
          aria-label="Contact us"
        >
          <div className={styles.formRow}>
            <div className={styles.accessibility}>
              <p>
                If you have any accessibility issues using this site, please
                contact us directly at{' '}
                <a href="mailto:healthsecuritynet@georgetown.edu">
                  healthsecuritynet@georgetown.edu
                </a>
                .
              </p>
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.firstName} htmlFor="First_Name">
              First name
              <input type="text" id="First_Name" name="First_Name" />
            </label>
            <label className={styles.lastName} htmlFor="Last_Name">
              Last name
              <input type="text" id="Last_Name" name="Last_Name" />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.email} htmlFor="Email">
              Email
              <input type="email" id="Email" name="Email" />
            </label>
            <label className={styles.org} htmlFor="Organization">
              Organization
              <input type="text" id="Organization" name="Organization" />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.body} htmlFor="body">
              Comment or question
              <textarea type="text" id="body" name="body" maxLength="1200" />
              <p className={styles.lengthHint}>200 Words</p>
              <p className={styles.lengthHint}>200 words</p>
            </label>
          </div>
          <div className={styles.formRow}>
            <button className={styles.submit}>{submitButtonText}</button>
          </div>
          <div className={styles.formRow}>{errorMessage}</div>
          <div className={styles.formRow}>{successMessage}</div>
        </form>
      </div>
      <MobileDisclaimer />
    </Layout>
  )
}

export default Contact
