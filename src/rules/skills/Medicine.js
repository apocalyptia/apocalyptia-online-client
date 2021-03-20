import Rule from '/src/classes/Rule.js'

const Medicine = new Rule({
	name: `Medicine`,
	desc: [
		`Diagnosing and treating wounds and Diseases.`,
	],
	type: `Skill`
})
Medicine.parent = `Brains`
Medicine.diff = `Damage`
Medicine.specs = {
	firstaid: new Rule({
		id: `d99dcfd7-e192-463f-941f-1487ec141793`,
		name: `First-Aid`,
		desc: [
			`Stop a person from Bleeding for a number of hours equal to your roll.`,
			`Inflict an additional 1 Damage on a Botch.`,
			`Takes 1 round per Damage.`,
		]
	}),
	surgery: new Rule({
		id: `84136a49-7dd1-4462-af4d-a9c8e2390f80`,
		name: `Surgery`,
		desc: [
			`Stop a person from Bleeding as long as they do not take any more Damage.`,
			`Inflict an additional d6 Damage on a Botch.`,
			`Takes [Damage x 20] minutes.`,
		]
	})
}

export default Medicine