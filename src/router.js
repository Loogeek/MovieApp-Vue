export default (router) => {
  router.map({
    '/': {
      name: 'index',
      component: view('index')
    },
    '/list/:type': {
      name: 'list',
      component: view('list')
    },
    '/show/:id': {
      name: 'show',
      component: view('show')
    },
    '/director/:id': {
      name: 'director',
      component: view('director')
    },
    '/search': {
      name: 'search',
      component: view('search')
    }
  })

  function view (name) {
    return (resolve) => {
      require(['./views/' + name + '.vue'], resolve)
    }
  }
}
