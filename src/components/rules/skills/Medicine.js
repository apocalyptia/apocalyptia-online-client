import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Medicine = new Skill({
	id: `8ebabc07-057f-4568-b6ed-cdb6941d14a6`,
	name: `Medicine`,
	desc: [
		`Diagnosing and treating wounds and Diseases.`,
	],
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Stat({
			id: `d99dcfd7-e192-463f-941f-1487ec141793`,
			name: `First-Aid`,
			desc: [
				`Stop a person from Bleeding for a number of hours equal to your roll.`,
				`Inflict an additional 1 Damage on a Botch.`,
				`Takes 1 round per Damage.`,
			]
		}),
		surgery: new Stat({
			id: `84136a49-7dd1-4462-af4d-a9c8e2390f80`,
			name: `Surgery`,
			desc: [
				`Stop a person from Bleeding as long as they do not take any more Damage.`,
				`Inflict an additional d6 Damage on a Botch.`,
				`Takes [Damage x 20] minutes.`,
			]
		})
	}
})

export default Medicine