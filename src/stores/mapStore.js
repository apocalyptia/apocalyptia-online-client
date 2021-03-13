// import AreaMapDOM from 'classes/AreaMapDOM.js'
// import { writable } from 'svelte/store'

// export default writable(new AreaMapDOM())


import AreaMapCanvas from 'classes/AreaMapCanvas.js'
import { writable } from 'svelte/store'

export default writable(new AreaMapCanvas())