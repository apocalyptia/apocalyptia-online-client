import Rule from '../../rules/Rule'


const Unarmed = new Rule({
	name: `Unarmed`, 
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	]
})

export default Unarmed