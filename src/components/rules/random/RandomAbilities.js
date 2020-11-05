import AbilitiesList from 'lists/AbilitiesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
    AbilitiesList.reset()
    c = c.updateAbilities()
    while(c.properties.experience.current) {
        const remainingAbilities = AbilitiesList.masterList.filter(m => {
            const abilityTaken = c.abilities.some(a => {
                let sameName = a.name == m.name
                let sameOption = true
                if (a.hasOwnProperty('opts')) sameOption = a.selection == m.selection
                return sameName && sameOption
            })
            return (m.xp <= c.properties.experience.current) && !abilityTaken
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