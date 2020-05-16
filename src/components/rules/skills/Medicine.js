import Skill from './Skill'
import Specialty from './Specialty'


const Medicine = new Skill({
	name: `Medicine`,
	desc: [
		`Diagnosing and treating Wounds and Diseases.`,
	],
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Specialty({
			name: `First-Aid`,
			desc: [
				`Stop a Wound from Bleeding.`,
				`Takes 1 minute per Damage.`,
			]
		}),
		surgery: new Specialty({
			name: `Surgery`,
			desc: [
				`Heal 1 Damage on a Wound.`,
				`Cannot be performed again on the same Wound until it is fully healed.`,
				`Inflict an additional d6 Damage on a Botch.`,
				`Takes [Damage x 20] minutes.`,
			]
		})
	}
})

export default Medicine