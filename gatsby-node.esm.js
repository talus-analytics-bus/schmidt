/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// // OPTO turn off type inference
// export const createSchemaCustomization = ({ actions }) => {
//   actions.createTypes(`
//     type SitePage implements Node @dontInfer {
//       path: String!
//     }
//   `)
// }

/**
 * Create all pages in site except Map page using data returned from API calls
 * @method createPages
 * @param  {[type]}    actions [description]
 * @return {Promise}           [description]
 */
export const createPages = async ({ actions: { createPage } }) => {

  // createPage({
  //   path: `/path/for/route`,
  //   component: require.resolve('./path/to/js'),
  //   context: {},
  // })
}


export default createPages
