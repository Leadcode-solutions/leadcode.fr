import React from 'react'
import {BookOpenIcon, Squares2X2Icon} from "@heroicons/react/24/outline";
import {UserIcon} from "@heroicons/react/24/solid";
import {Sidenav} from "./navbar";
import SubNav from "./SubNav";
import {usePage} from "@inertiajs/inertia-react";
import {ItemType} from '../types'



const navigation: ItemType[] = [
  {icon: Squares2X2Icon, name: 'Accueil', href: '/manager', component: 'home'},
  {
    icon: UserIcon,
    name: 'Accounts',
    href: '/manager/accounts',
    component: 'accounts',
    children: [
      {name: 'Overview', href: '/manager/accounts', component: 'home'},
      {name: 'Utilisateurs', href: '/manager/accounts/users', component: 'users'},
      {name: 'Roles', href: '/manager/accounts/roles', component: 'roles'},
    ]
  },
  {icon: BookOpenIcon, name: 'Blog', href: '/manager/blogs', component: 'blogs'}
]

export default () => {
  const page = usePage()
  const data = page.component.split('/')[0]
  const component = navigation.find((item) => item.component == data)

  return (
    <div className="flex">
      <Sidenav navigation={navigation} />
      {component?.children && <SubNav navigation={component.children} />}
    </div>
  )
}
