import Maneuver from '../Maneuver'


const Hide = new Maneuver({
	cat: `Defensive`,
	name: `Hide`, 
	desc: [
		`Roll [Stealth vs Perception] to be Concealed.`,
		`Your Speed is 0.`,
		`+3 Stealth if Prone.`,
	]
})

export default Hide