import AbilitiesList from 'lists/AbilitiesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
    AbilitiesList.reset()
    c = c.updateAbilities()
    while(c.properties.experience.current) {
        const remainingAbilities = AbilitiesList.masterList.filter(r => {
            const abilityTaken = c.abilities.some(a => a.name == r.name)
            return (r.xp <= c.properties.experience.current) && !abilityTaken
        })
        if (remainingAbilities.length) {
            const a = RandomRoll(remainingAbilities)
            a.taken++
            c.abilities.push(a)
            c = c.updateAbilities()
        }
        else break
    }
    return c
}