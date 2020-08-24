import RandomRoll from './RandomRoll'
import Names, { FemaleNames, MaleNames } from '../Names'


const RandomName = (c) => {
	if (c.desc.sex.value == `Male`) return RandomRoll(MaleNames)
	if (c.desc.sex.value == `Female`) return RandomRoll(FemaleNames)
	return RandomRoll(Names)
}

export default RandomName