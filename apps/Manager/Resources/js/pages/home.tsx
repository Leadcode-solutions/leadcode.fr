import React from 'react'
import Layout from '../layouts/layout'
import {usePage} from "@inertiajs/inertia-react";
import {ArrowDownRightIcon, ArrowUpRightIcon} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const stats = [
  { name: 'Project amount', stat: '$125,098.09', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'All projects', stat: '45 projects', previousStat: '56.14%', change: '24%', changeType: 'increase' },
  { name: 'Ongoing projects', stat: '29 Ongoing projects', previousStat: '16%', change: '4.05%', changeType: 'decrease' },
  { name: 'Review needed', stat: '8 need review', previousStat: '', change: '21%', changeType: 'increase'}
]

const State = () => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-theme dark:divide-gray-800 p-4 overflow-hidden rounded-lg bg-theme dark:bg-gray-900 shadow md:grid-cols-4 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="flex flex-col justify-between px-4 gap-6">
            <div className="flex flex-col">
              <span className="text-theme text-xs">{item.name}</span>
              <span className="text-2xl font-semibold text-theme">{item.stat}</span>
            </div>

            <div className="flex flex-col">
              <div className={classNames(
                item.changeType === 'increase' ? 'text-green-400'
                  : 'text-red-400'
              )}>
                <div className="flex items-center gap-3">
                  {item.changeType === 'increase'
                    ? <ArrowUpRightIcon className="w-6"/>
                    : <ArrowDownRightIcon className="w-6"/>
                  }
                  <span>{item.change}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">compared to average</span>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
export default function Home ()  {
  const auth: any = usePage().props.auth
  return (
    <Layout>
      <div className="py-8 container">
        <h1 className="text-2xl font-bold flex flex-col">👋 Welcome {auth.user.username}</h1>
        <p className="text-gray-600">Here is the summary for your team's project</p>
        <div className="my-10">
          <State />
        </div>
      </div>
    </Layout>
  )
}
