
export const create = ({
	createTime
}) => ({
	createComponentCreator,
	createEntityCreator,
	createEntityFromObject,
	systems: {
		tickTime,
		consumeCommodity,
		produceCommodity,
		updateCommodityValue
	},
	dispose
}) => {
	const { run, timeTicked } = createTime({
		createEntityFromObject,
		tickTime,
		dispose,
		tick: 1000,
		ticksToLive: 50
	})

	const createMarket = ({
		name,
		commodities
	}) => commodities.map(commodity => createEntityFromObject({
		entityId: `${name}-${commodity.name}`,
		obj: commodity
	}))

	const market = createMarket({
		name: 'aMarket',
		commodities: [{
			name: 'ironOre',
			commodityConsumtion: 1,
			commodityProduction: 0,
			commodityAmount: 5,
			commodityBasePrice: 50,
			commodityPrice: 50
		}, {
			name: 'bread',
			commodityConsumtion: 0,
			commodityProduction: 1,
			commodityAmount: 10,
			commodityBasePrice: 5,
			commodityPrice: 5
		}]
	})

	const createTrader = ({
		name
	}) => createEntityFromObject({
		entityId: `${name}-trader`,
		obj: {
			name,
			money: 25
		}
	})

	market.forEach(({
		entityId: commodityName,
		getComponent
	}) => getComponent({ componentId: 'commodityPrice' }).observe
		.filter(({ event }) => event == 'data-updated')
		.subscribe(({ component: { data: price } }) => console.log({ commodityName, price })))

	timeTicked.subscribe(() => {
		produceCommodity.run({ entities: market })
		.then(() => consumeCommodity.run({ entities: market }))
		.then(() => updateCommodityValue.run({ entities: market }))
	})

	run()
}
