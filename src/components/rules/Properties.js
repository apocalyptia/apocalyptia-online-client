import PropertiesList from './properties/lists/PropertiesList'


export default {
	name: `Properties`,
	explanation: [
		`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
	],
	list: PropertiesList,
	setScores: function(c) {
		this.list.forEach(p => p.formula(c))
		return c
	}
}