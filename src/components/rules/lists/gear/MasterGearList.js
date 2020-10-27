import AccessoryList from 'lists/gear/AccessoryList.js'
import AmmoList from 'lists/gear/AmmoList.js'
import ArmorList from 'lists/gear/ArmorList.js'
import BombList from 'lists/gear/BombList.js'
import DocumentList from 'lists/gear/DocumentList.js'
import DrugsList from 'lists/gear/DrugsList.js'
import ElectronicsList from 'lists/gear/ElectronicsList.js'
import EquipmentList from 'lists/gear/EquipmentList.js'
import MedicalList from 'lists/gear/MedicalList.js'
import MeleeWeaponList from 'lists/gear/MeleeWeaponList.js'
import RangedWeaponList from 'lists/gear/RangedWeaponList.js'
import StorageList from 'lists/gear/StorageList.js'

export default [
    {
        name: 'Master Gear List',
        value: undefined,
        list: [
            ...AccessoryList,
            ...AmmoList,
            ...ArmorList,
            ...BombList,
            ...DocumentList,
            ...DrugsList,
            ...ElectronicsList,
            ...EquipmentList,
            ...MedicalList,
            ...MeleeWeaponList,
            ...RangedWeaponList,
            ...StorageList
        ]
    },
    {
        name: 'Accessory',
        value: undefined,
        list: AccessoryList
    },
    {
        name: 'Ammo',
        value: undefined,
        list: AmmoList
    },
    {
        name: 'Armor',
        value: undefined,
        list: ArmorList
    },
    {
        name: 'Bomb',
        value: undefined,
        list: BombList
    },
    {
        name: 'Document',
        value: undefined,
        list: DocumentList
    },
    {
        name: 'Drug',
        value: undefined,
        list: DrugsList
    },
    {
        name: 'Electronics',
        value: undefined,
        list: ElectronicsList
    },
    {
        name: 'Equipment',
        value: undefined,
        list: EquipmentList
    },
    {
        name: 'Medical',
        value: undefined,
        list: MedicalList
    },
    {
        name: 'Melee',
        value: undefined,
        list: MeleeWeaponList
    },
    {
        name: 'Ranged',
        value: undefined,
        list: RangedWeaponList
    },
    {
        name: 'Storage',
        value: undefined,
        list: StorageList
    },
]