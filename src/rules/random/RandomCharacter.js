import CreationStepsList from '/src/rules/lists/CreationStepsList.js'
import RandomAbilities from '/src/rules/random/RandomAbilities.js'
import RandomDescription from '/src/rules/random/RandomDescription.js'
import RandomSkills from '/src/rules/random/RandomSkills.js'
import RandomStartingGear from '/src/rules/random/RandomStartingGear.js'
import RandomTraits from '/src/rules/random/RandomTraits.js'

export default (c) => {
    c = RandomDescription(c)
    c = RandomTraits(c)
    c = RandomSkills(c)
    c.updateProperties(c)
    c = RandomAbilities(c)
    c = RandomStartingGear(c, c.properties.luck.score)
	c.meta.step = CreationStepsList.length - 1
    return c
}