
export const create = () => ({
	systemId: 'produceCommodity',
	filter: [{
		componentId: 'commodityProduction',
		readonly: true
	}, {
		componentId: 'commodityAmount'
	}],
	run: ({
		commodityProduction,
		commodityAmount
	}) => ({
		commodityAmount: commodityAmount + commodityProduction
	})
})
