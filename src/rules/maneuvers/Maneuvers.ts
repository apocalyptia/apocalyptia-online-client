import { DefensiveManeuvers } from './defensive/DefensiveManeuvers'
import { OffensiveManeuvers } from './offensive/OffensiveManeuvers'
import { SocialManeuvers } from './social/SocialManeuvers'

export const Maneuvers = DefensiveManeuvers.concat(OffensiveManeuvers).concat(SocialManeuvers)