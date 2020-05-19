import Block from './Block'
import Carry from './Carry'
import Dodge from './Dodge'
import Experience from './Experience'
import Health from './Health'
import Intellect from './Intellect'
import Luck from './Luck'
import Psyche from './Psyche'
import Speed from './Speed'


export default {
	name: `Properties`,
	explanation: [
		`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
	],
	list: [
		Block,
		Carry,
		Dodge,
		Experience,
		Health,
		Intellect,
		Luck,
		Psyche,
		Speed,
	],
	setScores: function(c) {
		this.list.forEach(p => p.formula(c))
		return c
	}
}