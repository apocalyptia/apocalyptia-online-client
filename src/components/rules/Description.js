import Descriptor from '../classes/Descriptor'
import { 
	RandomName,
	RandomHeight,
	RandomWeight,
	RandomHair,
	RandomSkin,
	RandomSex,
	RandomAge
} from '../functions/Random'

export const age = new Descriptor({
	name: `Age`,
	value: ``,
	random: (c) => {
		c.description.age.value = RandomAge()
		return c
	}
})

export const identity = new Descriptor({
	name: `Name`,
	value: ``,
	random: (c) => {
		c.description.identity.value = RandomName(c.description.sex.value)
		return c
	}
})

export const hair = new Descriptor({
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.description.hair.value = RandomHair()
		return c
	}
})

export const height = new Descriptor({
	name: `Height`,
	value: ``,
	random: (c) => {
		c.description.height.value = RandomHeight()
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
		c.description.sex.value = RandomSex()
		return c
	}
})

export const skin = new Descriptor({
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.description.skin.value = RandomSkin()
		return c
	}
})

export const weight = new Descriptor({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.description.weight.value = RandomWeight()
		return c
	}
})

export default {
	name: `Description`,
	list: [
		player,
		identity,
		age,
		sex,
		height,
		weight,
		skin,
		hair
	],
	random: function(c){
		for (let i = 1; i < this.list.length; i++) {
			this.list[i].random(c)
		}
		return c
	},
	reset: function(c){
		Object.keys(c.description).forEach((d) => {
			c.description[d].value = ``
		})
		return c
	}
}