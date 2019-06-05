
export const create = ({
	systems
}) => ({
	createSystem,
	finished
}) => {
	systems.forEach(createSystem)
	finished()
}
