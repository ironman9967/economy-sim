
export const create = ({
	createEntityFromObject,
	tickTime,
	dispose,
	tick,
	ticksToLive
}) => {
	const dieTime = tick * ticksToLive

	const time = createEntityFromObject({
		entityId: 'time',
		obj: { elapsed: 0, tick }
	})

	const run = () => tickTime.run({ entities: [ time ] })

	const timeTicked = time.getComponent({ componentId: 'elapsed' }).observe
		.filter(({ event }) => event == 'data-updated')
	timeTicked.subscribe(({ newData: elapsed }) => console.log({ elapsed }))
	timeTicked.subscribe(({ newData: elapsed }) => elapsed < dieTime
		? run()
		: dispose())

	return { run, timeTicked }
}
