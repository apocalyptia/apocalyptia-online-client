import Names, { FemaleNames, MaleNames } from './Names'

export const d6 = () => {
	return Math.ceil(Math.random() * 6)
}

export const d6Roll = () => {
	let roll = d6()
	let result = roll
	if (roll == 6) {
		while (roll == 6) {
			roll = d6()
			result += roll
		}
	}
	if (roll == 1) {
		roll = d6()
		if (roll == 1) result = -666
	}
	return result
}

export const RandomRoll = (a) => {
	return a[Math.floor(Math.random() * a.length)]
}

export const RandomName = (sex) => {
	if (sex == `Male`) return RandomRoll(MaleNames)
	if (sex == `Female`) return RandomRoll(FemaleNames)
	return RandomRoll(Names)
}

export const RandomHeight = () => {
	const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
	const feet = Math.floor(totalInches / 12)
	const inches = Math.floor(totalInches % 12)
	return `${feet}ft ${inches}in`
}

export const RandomWeight = () => {
	return `${Math.ceil(Math.random() * 100) + 100}lbs`
} // 101 to 200 lbs

export const RandomHair = () => {
	return RandomRoll(
		[
			`Auburn`,
			`Bald`,
			`Black`,
			`Blonde`,
			`Brunette`,
			`Gray`,
			`Red`,
			`White`,
		]
	)
}

export const RandomSkin = () => {
	return RandomRoll(
		[
			`Black`,
			`Brown`,
			`Olive`,
			`Pale`,
			`Tan`,
			`White`,
		]
	) 
}

export const RandomSex = () => {
	return RandomRoll([`Female`, `Male`])
}

export const RandomAge = () => {
	return Math.ceil((Math.random() * 33) + 17)
}

export default RandomRoll