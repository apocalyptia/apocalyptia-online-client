    <button id="TableRollerBtn" class="Btn TableRoller">TABLE ROLLER</button>
    <div id="TableRollerSec" class="Sec0 TableRollerBorder">
        <label for="TableRollSelection"><h2 style="text-align:center;">Select Table:</h2></label> <select id="TableRollSelection" class="Roll">
            <option value="iMasterGearList">Master Gear List</option>
            <option value="iArmorList">Armor</option>
            <option value="iMeleeWeaponsList">Melee Weapons</option>
            <option value="iRangedWeaponsList">Ranged Weapons</option>
            <option value="iAmmoList">Ammunition</option>
            <option value="iBombsList">Bomb</option>
            <option value="iDrugList">Drugs</option>
            <option value="iMedicalList">Medical</option>
            <option value="iLandVehiclesList">Land Vehicle</option>
            <option value="iWatercraftList">Watercraft</option>
            <option value="iAircraftList">Aircraft</option>
        </select>
        <p style="text-align:center;"><span id="TableRollResult"></span></p>
        <button id="rollTableButton" class="Roll TableRoller" onclick="rollItem(document.getElementById('TableRollSelection').value, 'TableRollResult')">ROLL TABLE</button>
        <button id="TableResultsBtn" class="Btn TableRoller">TABLE RESULTS LOG</button>
        <div id="TableResultsSec" class="Sec1 TableRollerBorder">
            <span id="TableResultsLog"></span>
        </div>
    </div>