export default {
  ManagerPolicy: () => import('App/Manager/Policies/ManagerPolicy'),
  UserPolicy: () => import('App/Manager/Policies/UserPolicy'),
  RolePolicy: () => import('App/Manager/Policies/RolePolicy')
}
