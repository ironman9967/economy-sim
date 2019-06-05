
export const createImportSubDirs = ({
	path,
	walkDir
}) => ({
	directory
}) => Promise.all(walkDir.entries(directory)
	.reduce((modules, entry) => {
		if (entry.isDirectory()) {
			modules.push(path.resolve(directory, entry.relativePath))
		}
		return modules
	}, [])
	.map(relativePath => import(relativePath)))
.then(creates => Promise.all(creates.map(({ create }) => create())))
