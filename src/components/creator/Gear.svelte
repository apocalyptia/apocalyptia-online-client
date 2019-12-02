<script>
    import { CharacterStore } from '../../models/stores.js'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { AccessoryList } from '../../models/gear/accessories.js'
    import { AmmoList } from '../../models/gear/ammo.js'
    import { ArmorList } from '../../models/gear/armor.js'
    import { BombList } from '../../models/gear/bombs.js'
    import { DocumentList } from '../../models/gear/documents.js'
    import { DrugsList } from '../../models/gear/drugs.js'
    import { ElectronicsList } from '../../models/gear/electronics.js'
    import { EquipmentList } from '../../models/gear/equipment.js'
    import { MedicalList } from '../../models/gear/medical.js'
    import { MeleeList } from '../../models/gear/melee.js'
    import { RangedList } from '../../models/gear/ranged.js'
    import { StorageList } from '../../models/gear/storage.js'
    import { d6Roll } from '../../models/rules/roller.js'


    function roll() {
        console.log(d6Roll())
    }
</script>

<button on:click={roll}>ROLL IT</button>
<div>
    {#each ArmorList as armor}
        <div>{armor.type}</div>
    {/each}
</div>