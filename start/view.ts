import View from '@ioc:Adonis/Core/View'
import { join } from 'node:path'

View.mount('public', join(process.cwd(), 'apps', 'Public', 'Resources', 'views'))
View.mount('manager', join(process.cwd(), 'apps', 'Manager', 'Resources', 'views'))
View.mount('shared', join(process.cwd(), 'apps', 'Shared', 'Resources', 'views'))
