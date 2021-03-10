import PropertiesList from 'rules/lists/PropertiesList.js'

export default (c) => {
	c.properties = {}
	for (let prop of PropertiesList.list) {
		c.properties[prop.name.toLowerCase()] = {
			name: prop.name,
			score: 0,
			current: 0
		}
	}
	return c.properties
}