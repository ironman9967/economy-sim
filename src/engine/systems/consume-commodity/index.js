
export const create = () => ({
	systemId: 'consumeCommodity',
	filter: [{
		componentId: 'commodityConsumtion',
		readonly: true
	}, {
		componentId: 'commodityAmount'
	}],
	run: ({
		commodityConsumtion,
		commodityAmount
	}) => {
		const newAmt = commodityAmount - commodityConsumtion
		if (newAmt < 0) {
			return { commodityAmount: 0 }
		}
		return { commodityAmount: newAmt }
	}
})
