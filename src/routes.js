import { navigate } from 'svelte-routing'

const router = {
	Home: () => { navigate(`/`, { replace: true }) },
	Creator: () => { navigate(`/creator`, { replace: true }) },
	Reference: () => { navigate(`/reference`, { replace: true }) },
	RefCombat: () => { navigate(`/reference/combat`, { replace: true }) },
	RefManeuvers: () => { navigate(`/reference/maneuvers`, { replace: true }) },
	RefSituations: () => { navigate(`/reference/situations`, { replace: true }) }
}

export default router