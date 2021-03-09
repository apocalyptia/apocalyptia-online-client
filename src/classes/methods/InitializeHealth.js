export default (c) => {
	c.health = {
		head: {
			name: `Head`,
			score: 1,
			current: 1
		},
		rightArm: {
			name: `Right Arm`,
			score: 1,
			current: 1
		},
		leftArm: {
			name: `Left Arm`,
			score: 1,
			current: 1
		},
		torso: {
			name: `Torso`,
			score: 2,
			current: 2
		},
		leftLeg: {
			name: `Left Leg`,
			score: 1,
			current: 1
		},
		rightLeg: {
			name: `Right Leg`,
			score: 1,
			current: 1
		}
	}
	return c.health
}