import Ability from './Ability'


const PackMentality = new Ability({
	name: `Pack Mentality`,
	desc: [
		`+1 Attack at a target a Comrade Attacks this round.`,
	],
	max: 1,
	xp: 3
})

export default PackMentality