import Rule from '../../rules/Rule'


const Chase = new Rule({
	id: `aa44bbe5-d0e1-4bed-0125-19a3c88c587a`,
	name: `Chase`, 
	desc: [
		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Run Speed] each round, depending on the type of mobility in use.`,
		`The chase ends when one side gets 3 Successes over the other.`,
	]
})

export default Chase