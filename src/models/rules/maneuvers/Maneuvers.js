import { DefensiveManeuvers } from './defensive/DefensiveManeuvers.js'
import { OffensiveManeuvers } from './offensive/OffensiveManeuvers.js'
import { SocialManeuvers } from './social/SocialManeuvers.js'

export const Maneuvers = DefensiveManeuvers.concat(OffensiveManeuvers).concat(SocialManeuvers)