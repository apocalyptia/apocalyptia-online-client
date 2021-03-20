// import AreaMapDOM from '/src/classes/AreaMapDOM.js'
// import { writable } from 'svelte/store'

// export default writable(new AreaMapDOM())


import AreaMapCanvas from '/src/classes/AreaMapCanvas.js'
import { writable } from 'svelte/store'

export default writable(new AreaMapCanvas())