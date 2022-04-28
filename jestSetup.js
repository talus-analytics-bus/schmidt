const noop = () => { }
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
process.env.GATSBY_API_URL = 'http://localhost:5002'