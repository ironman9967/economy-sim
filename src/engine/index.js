
import path from 'path'

import walkDir from 'walk-sync'

import TWEEN from '@tweenjs/tween.js'

import { create as createEcs } from 'ecs-parallel'

import { createImportSubDirs } from './utils'

import { create as createSystems } from './systems'
import { create as createSystemCreator } from './system-creator'

import { create as createApp } from './app'

import { create as createTime } from './time'

// const run = async () => {
// 	const importSubDirs = createImportSubDirs({ path, walkDir })
// 	const systems = await createSystems({ importSubDirs })
// 	const systemCreator = await createSystemCreator({ systems })
//
// 	const app = await createApp({ createTime })
//
// 	createEcs(systemCreator, app)
// }
//
// run()

const go = (k, count = 1, easingFunc = TWEEN.Easing.Quadratic.In) => {
	console.log('k', k)
	let res = [ k ]
	while (--count > 0) {
		res = res.concat(go(easingFunc(res[res.length - 1]), count))
	}
	return res
}

console.log(go(1.5, 3))
