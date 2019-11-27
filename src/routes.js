import { navigate } from 'svelte-routing'

const router = {
    Home: () => { navigate("/", { replace: true }) },
    Creator: () => { navigate("/creator", { replace: true }) },
    Rules: () => { navigate("/rules", { replace: true }) }
}

export default router