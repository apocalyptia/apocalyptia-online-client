import CreationStepsList from 'rules/lists/CreationStepsList.js'
import RandomAbilities from 'rules/random/RandomAbilities.js'
import RandomDescription from 'rules/random/RandomDescription.js'
import RandomSkills from 'rules/random/RandomSkills.js'
import RandomStartingGear from 'rules/random/RandomStartingGear.js'
import RandomTraits from 'rules/random/RandomTraits.js'

export default (c) => {
    c = RandomDescription(c)
    c = RandomTraits(c)
    c = RandomSkills(c)
    c = c.setProperties()
    c = RandomAbilities(c)
    c = RandomStartingGear(c, c.properties.luck.score)
	c.meta.step = CreationStepsList.length - 1
    return c
}