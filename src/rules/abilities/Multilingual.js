import Ability from './Ability'
import Languages from '../../helpers/lists/Languages'


const Multilingual = new Ability({
	id: `bb6a0fb9-a5d7-4930-a782-9742763037b5`,
	name: `Multilingual`,
	desc: [
		`Learn a different form of communication.`,
	],
	max: 1,
	xp: 6,
	opts: Languages
})

export default Multilingual