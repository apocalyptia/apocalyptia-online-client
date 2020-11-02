const startingPoints = 14

const maxPoints = 6

const assign = (c, t) => {
	c.traits[t.name].score = parseInt(t.value)
	return limit(c, t.name)
}

const limit = (c, t) => {
	while(remaining(c) < 0) c.traits[t].score--
	return c
}

const remaining = (c) => {
	const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0)
	return startingPoints - spent
}

export default {
	name: `Traits`,
	text: [
		`You get ${startingPoints} Trait points to assign.`,
		`Traits range from 1 to ${maxPoints}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	startingPoints,
	maxPoints,
	assign,
	limit,
	remaining
}