
export const create = () => ({
	systemId: 'updateCommodityValue',
	filter: [{
		componentId: 'commodityAmount',
		readonly: true
	}, {
		componentId: 'commodityConsumtion',
		readonly: true
	}, {
		componentId: 'commodityProduction',
		readonly: true
	}, {
		componentId: 'commodityBasePrice',
		readonly: true
	}, {
		componentId: 'commodityPrice'
	}],
	run: ({
		commodityAmount,
		commodityConsumtion,
		commodityProduction,
		commodityBasePrice,
		commodityPrice
	}) => ({
		commodityPrice: commodityBasePrice
	})
})
