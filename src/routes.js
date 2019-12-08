import { navigate } from 'svelte-routing'

const router = {
	Home: () => { navigate(`/`, { replace: true }) },
	Creator: () => { navigate(`/creator`, { replace: true }) },
	Reference: () => { navigate(`/reference`, { replace: true }) }
}

export default router