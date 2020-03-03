import Description from '../classes/Description'

export const Age = new Description({
	name: `age`,
	value: ``
})

export const Character = new Description({
	name: `character`,
	value: ``
})

export const Hair = new Description({
	name: `hair`,
	value: ``
})

export const Height = new Description({
	name: `height`,
	value: ``
})

export const Player = new Description({
	name: `player`,
	value: ``
})

export const Sex = new Description({
	name: `sex`,
	value: ``
})

export const Skin = new Description({
	name: `skin`,
	value: ``
})

export const Weight = new Description({
	name: `weight`,
	value: ``
})

export default {
	list: [
		Player,
		Character,
		Age,
		Sex,
		Hair,
		Skin,
		Height,
		Weight
	]
}