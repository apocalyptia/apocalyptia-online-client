import RandomAbilities from 'random/RandomAbilities.js'
import RandomDescription from 'random/RandomDescription.js'
import RandomSkills from 'random/RandomSkills.js'
import RandomStartingGear from 'random/RandomStartingGear.js'
import RandomTraits from 'random/RandomTraits.js'

export default (c) => {
    c = RandomDescription(c)
    c = RandomTraits(c)
    c = RandomSkills(c)
    c = c.setProperties()
    c = RandomAbilities(c)
    c = RandomStartingGear(c, c.properties.luck.score)
    c.meta.status.step = 7
    return c
}