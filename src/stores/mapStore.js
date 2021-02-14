import { AreaMapDOM } from 'classes/AreaMap.js'
import { writable } from 'svelte/store'

export default writable(new AreaMapDOM())


// import { AreaMapCanvas } from 'classes/AreaMap.js'
// import { writable } from 'svelte/store'

// export default writable(new AreaMapCanvas())