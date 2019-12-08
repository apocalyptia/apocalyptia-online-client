import Rule from '../Rule'
import { Prepare } from './Prepare'

export const Actions = new Rule(
	`Actions`, 
	`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`, 
	[Prepare]
)