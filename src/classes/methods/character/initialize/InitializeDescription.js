import DescriptionList from '/src/rules/lists/DescriptionList.js'

export default (c) => {
	c.description = {}
	for (let desc of DescriptionList.list) {
		c.description[desc.name.toLowerCase()] = {
			name: desc.name,
			value: ``
		}
	}
	return c.description
}