import { navigate } from 'svelte-routing'

const router = {
    goHome: function() { navigate("/", {replace: true}) },
    goCharacter: function() { navigate("/character", {replace: true})},
    goRules: function() { navigate("/rules", {replace: true})},
    goDonate: function() { navigate("/donate", {replace: true})},
    goLanding: function() { navigate("/landing", {replace: true})}
}

export default router