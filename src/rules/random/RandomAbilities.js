import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
import Creation from 'rules/Creation.js'
import RandomRoll from 'rules/random/RandomRoll.js'

export default (c) => {
    AbilitiesList.reset()
    c = Creation.updateAbilities(c)
    while(c.properties.xp.current) {
        const remainingAbilities = AbilitiesList.masterList.filter(r => {
            return (
				r.xp <= c.properties.xp.current) &&
				!c.abilities.some(a => a.name == r.name
			)
        })
        if (remainingAbilities.length) {
            const a = RandomRoll(remainingAbilities)
            a.taken++
            c.abilities.push(a)
            c = Creation.updateAbilities(c)
        }
        else break
    }
    return c
}