import { writable } from 'svelte/store'

export default writable({
    open: false,
    toggle: function() {
        this.open = !this.open
        console.log('toggle ' + this.open)
        return this
    }
})