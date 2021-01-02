import Creation from 'rules/Creation.js'
import RandomRoll from 'random/RandomRoll.js'
import Skills from 'rules/Skills.js'

export default (c) => {
    c = Creation.resetSkills(c)
    while(Skills.remaining(c) > 0) {
        const t = RandomRoll(Object.keys(c.skills))
        const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score
        if (c.skills[t].score < parentScore) c.skills[t].score++
    }
    return c
}