import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'DefaultController.home').as('manager.home')
    Route.group(() => {
      Route.get('/', 'AccountsController.index').as('manager.accounts.index')
      Route.group(() => {
        Route.get('/', 'UsersController.index').as('manager.users.index')
        Route.get('/create', 'UsersController.create').as('manager.users.create')
        Route.post('/', 'UsersController.store').as('manager.users.store')
        Route.get('/edit/:id', 'UsersController.edit').as('manager.users.edit')
        Route.put('/:id', 'UsersController.update').as('manager.users.update')
        Route.delete('/:id', 'UsersController.destroy').as('manager.users.destroy')
      }).prefix('users')
      Route.group(() => {
        Route.get('/', 'RolesController.index').as('manager.roles.index')
        Route.get('/create', 'RolesController.create').as('manager.roles.create')
        Route.post('/', 'RolesController.store').as('manager.roles.store')
        Route.get('/edit/:id', 'RolesController.edit').as('manager.roles.edit')
        Route.put('/:id', 'RolesController.update').as('manager.roles.update')
        Route.delete('/:id', 'RolesController.destroy').as('manager.roles.destroy')
      }).prefix('roles')
    }).prefix('accounts')

    Route.group(() => {
      Route.get('/', 'BlogsController.ts.index').as('manager.blogs.index')
    }).prefix('blogs')

    Route.group(() => {
      Route.get('/', 'LightningController.index')
    }).prefix('/lightning')
  }).prefix('manager')
}).namespace('App/Manager/Controllers')
