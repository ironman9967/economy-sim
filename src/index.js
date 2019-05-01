
import path from 'path'

import walkDir from 'walk-sync'

import { create as createEcs } from 'ecs-parallel'

import { createImportSubDirs } from './utils'

import { create as createSystems } from './systems'
import { create as createSystemCreator } from './system-creator'

import { create as createApp } from './app'

import { create as createTime } from './time'

const run = async () => {
	const importSubDirs = createImportSubDirs({ path, walkDir })
	const systems = await createSystems({ importSubDirs })
	const systemCreator = await createSystemCreator({ systems })

	const app = await createApp({ createTime })

	createEcs(systemCreator, app)
}

run()
