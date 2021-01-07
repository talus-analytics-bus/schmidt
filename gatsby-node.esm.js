import path from 'path'

export const onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log('Page - ' + page.path)
  if (page.path.match(/^\/info/)) {
    createPage({
      path: '/info/overview',
      matchPath: '/info/overview',
      component: path.resolve('src/pages/info.js'),
    })
    createPage({
      path: '/info/documentation',
      matchPath: '/info/documentation',
      component: path.resolve('src/pages/info.js'),
    })
    createPage({
      path: '/info/user_guide',
      matchPath: '/info/user_guide',
      component: path.resolve('src/pages/info.js'),
    })
  }
}

export default onCreatePage
