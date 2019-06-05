
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
		componentId: 'commodityReserveCycles',
		readonly: true
	}, {
		componentId: 'commodityReserveConcern',
		readonly: true
	}, {
		componentId: 'commodityPriceScale',
		readonly: true
	}, {
		componentId: 'commodityMedianPrice',
		readonly: true
	}, {
		componentId: 'commodityPrice'
	}],
	run: ({
		commodityAmount,
		commodityConsumtion,
		commodityProduction,
		commodityReserveCycles,
		commodityReserveConcern,
		commodityPriceScale,
		commodityMedianPrice,
		commodityPrice
	}) => {
		const nextCycleAmt = commodityAmount + commodityProduction - commodityConsumtion
		const reserveAmt = commodityReserveCycles * commodityConsumtion
		const surplus = nextCycleAmt - reserveAmt
		const reserveConcern = surplus * commodityReserveConcern
		const priceScale = commodityMedianPrice / commodityPriceScale * -1
		const reserveScale = priceScale * reserveConcern
		const priceAdjustment = Math.ceil(reserveScale * commodityMedianPrice)
		const newPrice = priceAdjustment + commodityMedianPrice

console.log(newPrice)

		return { commodityPrice: -1 }
	}
})
