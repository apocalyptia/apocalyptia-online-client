import AccessoryList from '$rules/lists/gear/AccessoryList.js'
import AmmoList from '$rules/lists/gear/AmmoList.js'
import ArmorList from '$rules/lists/gear/ArmorList.js'
import BombList from '$rules/lists/gear/BombList.js'
import DocumentList from '$rules/lists/gear/DocumentList.js'
import DrugsList from '$rules/lists/gear/DrugsList.js'
import ElectronicsList from '$rules/lists/gear/ElectronicsList.js'
import EquipmentList from '$rules/lists/gear/EquipmentList.js'
import MedicalList from '$rules/lists/gear/MedicalList.js'
import MeleeWeaponList from '$rules/lists/gear/MeleeWeaponList.js'
import RangedWeaponList from '$rules/lists/gear/RangedWeaponList.js'
import StorageList from '$rules/lists/gear/StorageList.js'

export default [
    {
        name: 'Master Gear List',
        value: undefined,
        list: [
            ...AccessoryList.list,
            ...AmmoList.list,
            ...ArmorList.list,
            ...BombList.list,
            ...DocumentList.list,
            ...DrugsList.list,
            ...ElectronicsList.list,
            ...EquipmentList.list,
            ...MedicalList.list,
            ...MeleeWeaponList.list,
            ...RangedWeaponList.list,
            ...StorageList.list
        ]
    },
    {
        name: 'Accessory',
        value: undefined,
        list: AccessoryList.list
    },
    {
        name: 'Ammo',
        value: undefined,
        list: AmmoList.list
    },
    {
        name: 'Armor',
        value: undefined,
        list: ArmorList.list
    },
    {
        name: 'Bomb',
        value: undefined,
        list: BombList.list
    },
    {
        name: 'Document',
        value: undefined,
        list: DocumentList.list
    },
    {
        name: 'Drug',
        value: undefined,
        list: DrugsList.list
    },
    {
        name: 'Electronics',
        value: undefined,
        list: ElectronicsList.list
    },
    {
        name: 'Equipment',
        value: undefined,
        list: EquipmentList.list
    },
    {
        name: 'Medical',
        value: undefined,
        list: MedicalList.list
    },
    {
        name: 'Melee',
        value: undefined,
        list: MeleeWeaponList.list
    },
    {
        name: 'Ranged',
        value: undefined,
        list: RangedWeaponList.list
    },
    {
        name: 'Storage',
        value: undefined,
        list: StorageList.list
    },
]