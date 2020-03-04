import Description from '../classes/Description'
import { 
	RandomName,
	RandomHeight,
	RandomWeight,
	RandomHair,
	RandomSkin,
	RandomSex,
	RandomAge
} from '../functions/Random'

export const age = new Description({
	name: `Age`,
	value: ``,
	random: (c) => {
		c.description.age.value = RandomAge()
		return c
	}
})

export const identity = new Description({
	name: `Name`,
	value: ``,
	random: (c) => {
		c.description.identity.value = RandomName(c.description.sex.value)
		return c
	}
})

export const hair = new Description({
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.description.hair.value = RandomHair()
		return c
	}
})

export const height = new Description({
	name: `Height`,
	value: ``,
	random: (c) => {
		c.description.height.value = RandomHeight()
		return c
	}
})

export const player = new Description({
	name: `Player`,
	value: ``
})

export const sex = new Description({
	name: `Sex`,
	value: ``,
	random: (c) => {
		c.description.sex.value = RandomSex()
		return c
	}
})

export const skin = new Description({
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.description.skin.value = RandomSkin()
		return c
	}
})

export const weight = new Description({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.description.weight.value = RandomWeight()
		return c
	}
})

export default {
	list: [
		player,
		identity,
		age,
		sex,
		skin,
		hair,
		height,
		weight
	],
	random: function(c){
		for (let i = 1; i < this.list.length; i++) {
			this.list[i].random(c)
		}
		return c
	},
	reset: function(c){
		Object.keys(c.description).forEach((d) => {
			console.log(c.description[d].value)
			c.description[d].value = ``
			console.log(c.description[d].value)
		})
		return c
	}
}