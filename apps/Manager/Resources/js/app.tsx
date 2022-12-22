import { InertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import { createRoot } from 'react-dom/client';

import '../css/app.css'

const element = document.getElementById('app')

const root = createRoot(element!);
root.render(
  <InertiaApp
    initialPage={JSON.parse(element!.dataset.page!)}
    initialComponent={null}
    resolveComponent={(name) => import(`./pages/${name}`).then((module) => module.default)}
  />
)
