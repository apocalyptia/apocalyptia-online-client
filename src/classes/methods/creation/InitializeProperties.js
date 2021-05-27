import Properties from '/src/rules/Properties.js'

export default () => {
	const properties = {}
	for (const prop of Object.keys(Properties)) {
		properties[prop] = {
			name: Properties[prop].name,
			score: 0,
			current: 0
		}
		if (prop === 'health') {
			properties.health.locations = {}
			for (const loc of Object.keys(Properties.health.locations)) {
				properties.health.locations[loc] = {
					name: Properties.health.locations[loc].name,
					score: 0,
					current: 0
				}
			}
		}
	}
	return properties
}