<script>
    import { CharacterStore } from '../../models/stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { AccessoryList } from '../../models/gear/accessories'
    import { AmmoList } from '../../models/gear/ammo'
    import { ArmorList } from '../../models/gear/armor'
    import { BombList } from '../../models/gear/bombs'
    import { DocumentList } from '../../models/gear/documents'
    import { DrugsList } from '../../models/gear/drugs'
    import { ElectronicsList } from '../../models/gear/electronics'
    import { EquipmentList } from '../../models/gear/equipment'
    import { MedicalList } from '../../models/gear/medical'
    import { MeleeList } from '../../models/gear/melee'
    import { RangedList } from '../../models/gear/ranged'
    import { StorageList } from '../../models/gear/storage'
    import { d6Roll } from '../../models/roller'


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