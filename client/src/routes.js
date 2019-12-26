import { navigate } from 'svelte-routing'

export const router = {
	Home: () => { navigate(`/`, { replace: true }) },
	Creator: () => { navigate(`/creator`, { replace: true }) },
	Reference: () => { navigate(`/reference`, { replace: true }) },
	// RefDice: () => { navigate(`/reference/dice`, { replace: true })},
	// RefTraits: () => { navigate(`/reference/traits`, { replace: true })},
	// RefSkills: () => { navigate(`/reference/skills`, { replace: true })},
	// RefCombat: () => { navigate(`/reference/combat`, { replace: true }) },
	// RefManeuvers: () => { navigate(`/reference/maneuvers`, { replace: true }) },
	// RefSituations: () => { navigate(`/reference/situations`, { replace: true }) },
	// RefAbilities: () => { navigate(`/reference/abilities`, { replace: true })},
	// RefGear: () => { navigate(`/reference/Gear`, { replace: true })},
}
