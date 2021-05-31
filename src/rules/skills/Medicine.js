import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Medicine = new Skill({
	name: `Medicine`,
	desc: [`Diagnosing and treating wounds and Diseases.`],
	type: `Skill`,
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Specialty({
			name: `First-Aid`,
			type: `Specialty`,
			desc: [
				`Stop a person from Bleeding for a number of hours equal to your roll.`,
				`Inflict an additional 1 Damage on a Botch.`,
				`Takes 1 Round per Damage.`
			]
		}),
		surgery: new Specialty({
			name: `Surgery`,
			type: `Specialty`,
			desc: [
				`Stop a person from Bleeding as long as they do not take any more Damage.`,
				`Inflict an additional d6 Damage on a Botch.`,
				`Takes [Damage x 20] minutes.`
			]
		})
	}
})

export default Medicine
