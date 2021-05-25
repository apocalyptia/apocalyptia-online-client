import Rule from '../../classes/Rule.js' 

const Push = new Rule({
	name: `Push`,
	desc: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	],
	type: `Offensive`
})

export default Push