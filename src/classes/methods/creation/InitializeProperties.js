export default (rules) => {
	const properties = {}
	for (const prop of Object.keys(rules.list.properties)) {
		properties[prop] = {
			name: rules.list.properties[prop].name,
			score: 0,
			current: 0
		}
		if (prop === 'health') {
			properties.health.locations = {}
			for (const loc of Object.keys(rules.list.properties.health.locations)) {
				properties.health.locations[loc] = {
					name: rules.list.properties.health.locations[loc].name,
					score: 0,
					current: 0
				}
			}
		}
	}
	return properties
}