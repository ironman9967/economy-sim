
export const create = () => ({
	systemId: 'tickTime',
	filter: [{
		componentId: 'tick',
		readonly: true
	}, {
		componentId: 'elapsed'
	}],
	run: ({ tick, elapsed }) => new Promise(resolve =>
		setTimeout(() => resolve({ elapsed: elapsed + tick }), tick)
	)
})
