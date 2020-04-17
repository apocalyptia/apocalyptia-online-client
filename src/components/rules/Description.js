import Descriptor from '../classes/Descriptor'
import { 
	RandomName,
	RandomHeight,
	RandomWeight,
	RandomHair,
	RandomSkin,
	RandomSex,
	RandomAge
} from '../helpers/Random'

export const age = new Descriptor({
	name: `Age`,
	value: ``,
	random: (c) => {
		c.desc.age.value = RandomAge()
		return c
	}
})

export const identity = new Descriptor({
	name: `Name`,
	value: ``,
	random: (c) => {
		c.desc.identity.value = RandomName(c.desc.sex.value)
		return c
	}
})

export const hair = new Descriptor({
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.desc.hair.value = RandomHair()
		return c
	}
})

export const height = new Descriptor({
	name: `Height`,
	value: ``,
	random: (c) => {
		c.desc.height.value = RandomHeight()
		return c
	}
})

export const player = new Descriptor({
	name: `Player`,
	value: ``
})

export const sex = new Descriptor({
	name: `Sex`,
	value: ``,
	random: (c) => {
		c.desc.sex.value = RandomSex()
		return c
	}
})

export const skin = new Descriptor({
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.desc.skin.value = RandomSkin()
		return c
	}
})

export const weight = new Descriptor({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.desc.weight.value = RandomWeight()
		return c
	}
})


export default {
	name: `desc:`,
	list: [
		player,
		identity,
		age,
		sex,
		height,
		weight,
		skin,
		hair,
	],
	random: function(c){
		for (let i = 1; i < this.list.length; i++) {
			this.list[i].random(c)
		}
		return c
	},
	reset: function(c){
		Object.keys(c.desc).forEach((d) => {
			c.desc[d].value = ``
		})
		return c
	}
}