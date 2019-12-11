import Skill from './Skill.js'
import Specialty from './Specialty.js'

export const Acrobatics = new Skill(`Acrobatics`,     `Gymnastic prowess.`,   `Agility`,  6,  [
    new Specialty(`Dodge`, `Roll vs [MATK or Ranged(Throw)].`),
    new Specialty(`Jump`, `Running Jump [Speed]. Vertical [Speed x 3"].`)
])
