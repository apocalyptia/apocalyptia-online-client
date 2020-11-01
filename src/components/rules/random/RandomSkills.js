import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
    c = c.resetSkills()
    while(this.remaining(c) > 0) {
        const t = RandomRoll(Object.keys(c.skills))
        const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score
        if (c.skills[t].score < parentScore) c.skills[t].score++
    }
    return c
}