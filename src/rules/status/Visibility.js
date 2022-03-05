import Status from '$classes/Status.js'

const Visibility = new Status({
	name: `Visibility`,
	description: [
		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`
	],
	type: `Status`
})

export default Visibility
