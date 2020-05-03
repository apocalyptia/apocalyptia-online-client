import RandomRoll from './RandomRoll'
import Names, { FemaleNames, MaleNames } from '../Names'


const RandomName = (sex) => {
	if (sex == `Male`) return RandomRoll(MaleNames)
	if (sex == `Female`) return RandomRoll(FemaleNames)
	return RandomRoll(Names)
}

export default RandomName