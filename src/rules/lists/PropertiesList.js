import Block from '$rules/properties/Block.js'
import Carry from '$rules/properties/Carry.js'
import Dodge from '$rules/properties/Dodge.js'
import Health from '$rules/properties/Health.js'
import Intellect from '$rules/properties/Intellect.js'
import Luck from '$rules/properties/Luck.js'
import Psyche from '$rules/properties/Psyche.js'
import Speed from '$rules/properties/Speed.js'
import XP from '$rules/properties/XP.js'

export default {
	name: `Properties`,
	list: [
		Block,
		Carry,
		Dodge,
		Health,
		Intellect,
		Luck,
		Psyche,
		Speed,
		XP,
	]
}