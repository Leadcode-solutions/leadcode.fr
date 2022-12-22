import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'DefaultController.home').as('home')
  Route.get('/ui', 'DefaultController.ui').as('ui')

  Route.group(() => {
    Route.get('/login', 'AuthController.login').as('login')
    Route.post('/login', 'AuthController.loginWeb')

    Route.post('/logout', 'AuthController.logout').as('logout')
  }).prefix('authentication')
}).namespace('App/Public/Controllers')
