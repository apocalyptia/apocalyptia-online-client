import PropertiesList from '/src/rules/lists/PropertiesList.js'

export default (c) => {
	for (let p of PropertiesList.list) {
		p.formula(c)
	}
	for (let prop in c.properties) {
		c.properties[prop].current = c.properties[prop].score
	}
}