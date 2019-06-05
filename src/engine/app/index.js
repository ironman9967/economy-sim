
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
		ticksToLive: 12
	})

	const createMarket = ({
		name,
		commodities
	}) => commodities.map(commodity => createEntityFromObject({
		entityId: commodity.name,
		obj: commodity
	}))

	const market = createMarket({
		name: 'aMarket',
		commodities: [{
			name: 'ironOre',
			commodityAmount: 492,
			commodityConsumtion: 6,
			commodityProduction: 0,
			commodityReserveCycles: 20,
			commodityReserveConcern: 2,
			commodityPriceScale: 10000,
			commodityMedianPrice: 500,
			commodityPrice: 0
		}]
	})

	// market.forEach(({
	// 	entityId: commodity,
	// 	getComponent
	// }) => getComponent({ componentId: 'commodityPrice' }).observe
	// 	.filter(({ event }) => event == 'data-updated')
	// 	.subscribe(({ component: { data: price } }) => console.log({ commodity, price })))

	timeTicked.subscribe(() => {
		produceCommodity.run({ entities: market })
		.then(() => consumeCommodity.run({ entities: market }))
		.then(() => updateCommodityValue.run({ entities: market }))
	})

	run()
}
