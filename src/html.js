import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  React.useEffect(() => {}, [])
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="preload" href="/cookieconsent.min.css" as="style" />
        <link rel="stylesheet" href="/cookieconsent.min.css" />
        {props.headComponents}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KHMJG9CZYH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window["ga-disable-G-KHMJG9CZYH"] = true;`,
          }}
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src="/cookieconsent.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          /**
           * If consent is given for cookies, add gtag cookies
           * @method setupGA
           * @return {[type]} [description]
           */
          function setupGA(allowed) {
            if (!allowed) {
              window["ga-disable-G-KHMJG9CZYH"] = true;
            } else {
              window["ga-disable-G-KHMJG9CZYH"] = false;
              /**
               * Helper function for defining gtag cookies
               * @method gtag
               * @return {[type]} [description]
               */
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "G-KHMJG9CZYH");
            }
          }
          window.cookieconsent.initialise({
            palette: {
              popup: {
                background: "#edf2f4"
              },
              button: {
                background: "#be0e23"
              }
            },
            autoOpen: true,
            position: "bottom-left",
            type: "opt-in",
            content: {
              message:
                "Health Security Library uses cookies to ensure you get the best experience possible. Health Security Library is optimized for desktop browsers."
            },
            hasTransition: false,
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
            onInitialise: function(status) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onStatusChange: function(status, chosenBefore) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onRevokeChoice: function() {
              var type = this.options.type;
              if (type == "opt-in") {
                // disable cookies
                setupGA(false);
              }
              if (type == "opt-out") {
                // enable cookies
                setupGA(true);
              }
            }
          });`,
          }}
        ></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
