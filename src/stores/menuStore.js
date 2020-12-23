import { writable } from 'svelte/store'

export const menuStore = writable({
    open: false,
    toggle: function() {
        this.open = !this.open
        return this
    }
})