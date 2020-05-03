import Rule from '../../classes/Rule'


const Visibility = new Rule({
	name: `Visibility`, 
	desc: [
		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`,
	]
})

export default Visibility