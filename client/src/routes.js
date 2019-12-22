import { navigate } from 'svelte-routing'
import Home from './pages/Home.svelte'
import Creator from './pages/Creator.svelte'
import CreDescription from './components/creator/CreDescription.svelte'
import CreTraits from './components/creator/CreTraits.svelte'
import CreSkills from './components/creator/CreSkills.svelte'
import CreProperties from './components/creator/CreProperties.svelte'
import CreAbilities from './components/creator/CreAbilities.svelte'
import CreGear from './components/creator/CreGear.svelte'
import Reference from './pages/Reference.svelte'
import RefCombat from './components/reference/RefCombat.svelte'
import RefManeuvers from './components/reference/RefManeuvers.svelte'
import RefSituations from './components/reference/RefSituations.svelte'

// export const appRoutes = [
// 	{ path: `/`, component: Home },
// 	{ path: `/creator`, component: Creator },
// 	{ path: `/reference`, component: Reference },
// 	{ path: `/reference/combat`, component: RefCombat },
// 	{ path: `/reference/maneuvers`, component: RefManeuvers },
// 	{ path: `/reference/situations`, component: RefSituations },
// ]

// let newRouter = {}

// appRoutes.forEach((r) => {
// 	newRouter[r.component.name] = () => { navigate(`${r.path}`, { replace: true }) }
// })

// export const router = newRouter

export const router = {
	Home: () => { navigate(`/`, { replace: true }) },
	Creator: () => { navigate(`/creator`, { replace: true }) },
	Traits: () => { navigate(`/`, { replace: true }) },
	Reference: () => { navigate(`/reference`, { replace: true }) },
	RefCombat: () => { navigate(`/reference/combat`, { replace: true }) },
	RefManeuvers: () => { navigate(`/reference/maneuvers`, { replace: true }) },
	RefSituations: () => { navigate(`/reference/situations`, { replace: true }) }
}
