import Block from 'properties/Block.js'
import Carry from 'properties/Carry.js'
import Dodge from 'properties/Dodge.js'
import Experience from 'properties/Experience.js'
import Health from 'properties/Health.js'
import Intellect from 'properties/Intellect.js'
import Luck from 'properties/Luck.js'
import Psyche from 'properties/Psyche.js'
import Speed from 'properties/Speed.js'

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