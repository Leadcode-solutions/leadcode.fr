import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'DefaultController.home').as('home')
  Route.get('/ui', 'DefaultController.ui').as('ui')

  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'AuthController.login').as('login')
      Route.post('/', 'AuthController.loginWeb')

      Route.get('/:provider', 'SocialAuthController.redirect').as('social-login')
      Route.get('/:provider/callback', 'SocialAuthController.callback')
    }).prefix('login')

    Route.post('/logout', 'AuthController.logout').as('logout')
  }).prefix('authentication')
}).namespace('App/Public/Controllers')
