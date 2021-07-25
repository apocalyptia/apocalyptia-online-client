import { v4 as uuidv4 } from 'uuid'

export default () => {
	return {
		id: uuidv4(),
		user: ``,
		created: ``,
		modified: ``,
		notes: ``,
		status: [],
		step: 0,
		coordinates: {
			m: ``,
			f: 0,
			x: 0,
			y: 0,
			z: 0,
		},
	}
}
