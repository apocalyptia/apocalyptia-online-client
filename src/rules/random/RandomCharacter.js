import Creation from 'rules/Creation.js'
import RandomAbilities from 'rules/random/RandomAbilities.js'
import RandomDescription from 'rules/random/RandomDescription.js'
import RandomSkills from 'rules/random/RandomSkills.js'
import RandomStartingGear from 'rules/random/RandomStartingGear.js'
import RandomTraits from 'rules/random/RandomTraits.js'

export default (c) => {
    c = RandomDescription(c)
    c = RandomTraits(c)
    c = RandomSkills(c)
    c = Creation.setProperties(c)
    c = RandomAbilities(c)
    c = RandomStartingGear(c, c.properties.luck.score)
	c.meta.status.step = 6
    return c
}