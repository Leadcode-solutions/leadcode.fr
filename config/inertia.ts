/**
 * Feel free to let me know via PR,
 * if you find something broken in this config file.
 */

import { InertiaConfig } from '@ioc:EidelLev/Inertia';
import { join } from 'node:path'

/*
|--------------------------------------------------------------------------
| Inertia-AdonisJS config
|--------------------------------------------------------------------------
|
*/

export const inertia: InertiaConfig = {
  view: join(process.cwd(), 'apps', 'Manager', 'Resources', 'views', 'app.edge'),
  ssr: {
    enabled: false,
  },
};
