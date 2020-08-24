import Description from '../../rules/description/Description'
import Traits from '../../rules/traits/Traits'
import Skills from '../../rules/skills/Skills'
import Properties from '../../rules/properties/Properties'
import Abilities from '../../rules/abilities/Abilities'
import RandomStartingGear from './RandomStartingGear'

const RandomCharacter = (c) => {
    c = Description.random(c)
    c = Traits.random(c)
    c = Skills.random(c)
    c = Properties.setScores(c)
    c = Abilities.random(c)
    c = RandomStartingGear(c, c.props.luck.score)
    return c
}

export default RandomCharacter