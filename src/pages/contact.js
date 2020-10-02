// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import { PrimaryButton } from '../components/common'

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
  const [type, setType] = React.useState('')

  const [joinButtonText, setJoinButtonText] = React.useState('Join')
  const [joinErrorMessage, setJoinErrorMessage] = React.useState('')

  const handleJoin = event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    if (data.Email_Address === '') {
      setJoinErrorMessage(<p>Please Enter an Email Address.</p>)
    } else {
      setJoinErrorMessage('')
      setJoinButtonText('Submitting...')
      data['subject'] = 'Request to Join COVID Local Mailinglist'
      data['site'] = 'COVID Local Mailinglist Request'
      data[
        'body'
      ] = `${data.Email_Address} would like to be added to the COVID Local mailinglist.`
      axios
        .post(
          'https://p0hkpngww3.execute-api.us-east-1.amazonaws.com/submit',
          JSON.stringify(data),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          setJoinErrorMessage(<p>Success!</p>)
          setJoinButtonText('Join')
        })
        .catch(error =>
          setJoinErrorMessage(
            'There was an error submitting your request, please check your network connection and try again.'
          )
        )
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    const emptyfields = Object.values(data).some(field => field === '')

    if (emptyfields) {
      setErrorMessage(
        <h2 className={styles.error}>
          Some required fields below are not filled in, please complete before
          submitting.
        </h2>
      )
    } else {
      data['subject'] = 'New message from COVID-Local'
      data['site'] = 'covid-local'
      setErrorMessage('')
      setSubmitButtonText('Submitting...')
      axios
        .post(
          'https://p0hkpngww3.execute-api.us-east-1.amazonaws.com/submit',
          JSON.stringify(data),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          setSuccessMessage(
            <h2 className={styles.success}>Feedback Submitted</h2>
          )
          setSubmitButtonText('Submit')
        })
        .catch(error =>
          setErrorMessage(
            'There was an error submitting your request, please check your network connection and try again.'
          )
        )
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
          aria-label="Contact Us"
        >
          <div className={styles.formRow}>
            <div className={styles.accessibility}>
              <p>
                If you have any accessibility issues using this site, please
                contact us directly at{' '}
                <a href="mailto:COVIDLocal@nti.org">COVIDLocal@nti.org</a>.
              </p>
            </div>
            <p>
              We welcome questions about the Frontline Guide, feedback on its
              contents, input on how COVID-Local efforts can support your
              community, or other questions or comments, using the form below.
            </p>
            <p>
              Your personal and contact information will be used to respond to
              your input and to provide future updates regarding the site. Do
              not submit any proprietary or protected information via this form.
              (<a href="https://www.nti.org/legal/">NTI privacy policy</a>)
            </p>
          </div>
          <div className={styles.formRow}>{errorMessage}</div>
          <div className={styles.formRow}>
            <label className={styles.firstName} htmlFor="First_Name">
              First Name*
              <input type="text" id="First_Name" name="First_Name" />
            </label>
            <label className={styles.lastName} htmlFor="Last_Name">
              Last Name*
              <input type="text" id="Last_Name" name="Last_Name" />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.email} htmlFor="Email">
              Email*
              <input type="text" id="Email" name="Email" />
            </label>
            <label className={styles.org} htmlFor="Organization">
              Organization*
              <input type="text" id="Organization" name="Organization" />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.type} htmlFor="Type">
              Topic*
              <select
                name="Type"
                onChange={e => {
                  setType(e.target.value)
                  console.log(e.target.value)
                }}
              >
                <option value="Comment">General comment</option>
                <option value="Feedback on the Guide">
                  Feedback on the Guide
                </option>
                <option value="Question">Submit question</option>
                {/* <option value="Join Mailinglist">Join mailing list</option> */}
              </select>
            </label>
            <label
              className={styles.type}
              htmlFor="Type"
              style={
                type === 'Question'
                  ? { visibility: 'visible' }
                  : { visibility: 'hidden' }
              }
            >
              Comment category*
              <select name="Category">
                <option value="General">General</option>
                <option value="Medical Capacity">Medical Capacity</option>
                <option value="Logistics">Logistics / PPE Suppy Chain</option>
                <option value="Testing, Contact Tracing, Surveilance">
                  Disease Testing, Contact Tracing, & Surveilance
                </option>
                <option value="Modeling">Modeling</option>
                <option value="Vulnerable Populations, Low Resource Settings">
                  Vulnerable Populations, Low Resource Settings
                </option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.body} htmlFor="body">
              Comment or question*
              <textarea type="text" id="body" name="body" maxLength="1200" />
              <p>200 Words</p>
            </label>
          </div>
          <div className={styles.formRow}>
            <button className={styles.submit}>{submitButtonText}</button>
          </div>
          <div className={styles.formRow}>{successMessage}</div>
        </form>

        <form
          className={styles.join}
          onSubmit={handleJoin}
          aria-label="Join Email List"
        >
          <div className={styles.formRow}>
            <label>
              <span>
                To receive updates about new COVID Local resources, join our
                email list:
              </span>
              <input
                type="text"
                aria-label="Enter email address to join mailing list"
                name="Email_Address"
              />
            </label>
          </div>
          <div className={styles.formRow}>
            {joinErrorMessage}
            <button className={styles.submit}>{joinButtonText}</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Contact
