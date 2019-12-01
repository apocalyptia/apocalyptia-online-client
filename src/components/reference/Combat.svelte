<script>
    import CombatRuleList from '../../models/rules/combat.js'
    let visible = false
    let action_visible = false    
</script>

<div class='combat-rules'>
    <label class='checkbar'>
        <input type='checkbox' bind:checked={visible}>
        <div class='section-title'>
            <span class='checkbox'>
                {#if visible}
                    [-]
                {:else}
                    [+]
                {/if}
            </span>
            <h2>Combat</h2>
        </div>
    </label>
    {#if visible}
        <div id='CombatSec' class='sheet-section'>
            <p>Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn to act in a combat round. Either the GN decides or roll A vs A to determine who goes first. At the end of each turn, the player gets to choose who will go next among those who have not had a turn yet in this round. At the end of the rnd, DMG is applied and the last player to act decides who will start the next round.</p>
            <p>Most Extras are controlled by the GN on the GN’s turn. Pets, employees, etc. are controlled by their owners/bosses, but the GN has final say. The GN may give a brief recap at the end of each rnd, or skip it to leave inattentive Players in a “fog of war”.</p>
            <button id='ActionsBtn' class='Btn'>ACTIONS</button>
            <div id='ActionsSec' class='stat-block'>
                <p>You get 1 action/rnd. As your 1 action, you may: make a Trait or Skill roll, perform a Maneuver, draw or stow an item, use an item, interact with the environment, or hold for next rnd.</p>
                <button id='FastActionsBtn' class='Btn'>FAST ACTIONS</button>
                <div id='FastActionsSec' class='stat-block'>
                    <p>You can take a number of Fast actions equal to your Agility in a round, in addition to your movement and regular action. Examples include: Block, Dodge, Rapid ATKs, pick up an item, go Prone, or speak a sentence.</p>
                </div>
            </div>
            <button id='MovementBtn' class='Btn'>MOVEMENT</button>
            <div id='MovementSec' class='stat-block'>
                <p>On your turn, you may walk up to your Speed [A + C] and perform 1 action. You may divide up your Speed before or after your action. You may fall Prone or stand as a Fast action.</p>
                <button id='JogSprintBtn' class='Btn'>JOG or SPRINT</button>
                <div id='JogSprintSec' class='stat-block'>
                    <p>Jog is [Speed x2] up to C miles. Sprint is [Speed x2 + d6yds] up to C minutes. Roll C# = miles or minutes for each additional mile or minute. On a Fail, stop for 1 minute. Jog and Sprint take your entire turn. Use Reflex for DEF. You are Unstable (-3 to any RATK targeting you).</p>
                </div>
            </div>
            <button id='AttackBtn' class='Btn'>ATTACK (ATK)</button>
            <div id='AttackSec' class='stat-block'>
                <p>There are two kinds of attack (ATK) actions: Melee attacks (MATK) and Ranged attacks (RATK).</p>
                <p>Roll [d6 + Melee or Ranged] vs a target's Defense (DEF) to attack a target. Re-roll ties. Explosions (6) let you roll a d6 again and add it to ATK. Botches (1) usually result in broken or jammed weapons. The amount an ATK exceeds DEF is bonus DMG.</p>
                <button id='LocationsBtn' class='Btn'>LOCATIONS</button>
                <div id='LocationsSec' class='stat-block'>
                    <p>A Called Shot or random Location roll are optional for any RATK. MATKs and RATKs within 1yd can be Called Shots without penalty. RATKs within the weapon’s first Range increment target Torso by default, but farther RATKs are randomly rolled by default. Blast DMG Locations are always randomly rolled.</p>
                    <button id='HeadLocationBtn' class='Btn'>6 HEAD</button>
                    <div id='HeadLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -3 RATK</p>
                        <p>DMG Effects: Stun 1rnd</p>
                        <p>0HP Effects: Knockout</p>
                    </div>
                    <button id='LeftArmLocationBtn' class='Btn'>5 LEFT ARM</button>
                    <div id='LeftArmLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -1 RATK</p>
                        <p>DMG Effects: Drop Item</p>
                        <p>0HP Effects: Limb Disabled</p>
                    </div>
                    <button id='RightArmLocationBtn' class='Btn'>4 RIGHT ARM</button>
                    <div id='RightArmLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -1 RATK</p>
                        <p>DMG Effects: Drop Item</p>
                        <p>0HP Effects: Limb Disabled</p>
                    </div>
                    <button id='TorsoLocationBtn' class='Btn'>3 TORSO</button>
                    <div id='TorsoLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -0 RATK</p>
                        <p>DMG Effects: None</p>
                        <p>0HP Effects: Knockout</p>
                    </div>
                    <button id='RightLegLocationBtn' class='Btn'>2 RIGHT LEG</button>
                    <div id='RightLegLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -1 RATK</p>
                        <p>DMG Effects: -1 Speed/DMG</p>
                        <p>0HP Effects: Limb Disabled</p>
                    </div>
                    <button id='LeftLegLocationBtn' class='Btn'>1 LEFT LEG</button>
                    <div id='LeftLegLocationSec' class='stat-block'>
                        <p>Called Shot Penalty: -1 RATK</p>
                        <p>DMG Effects: -1 Speed/DMG</p>
                        <p>0HP Effects: Limb Disabled</p>
                    </div>
                </div>
            </div>
            <button id='DefenseBtn' class='Btn'>DEFENSE (DEF)</button>
            <div id='DefenseSec' class='stat-block'>
                <p>To actively defend from an ATK, you must spend a Fast action to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. You must be aware of an ATK to roll DEF. Otherwise, use Reflex.</p>
                <p>A Botched DEF roll means you fall Prone (if using Dodge) or break your weapon (if using Block).</p>
                <button id='ReflexBtn' class='Btn'>REFLEX (REF)</button>
                <div id='ReflexSec' class='stat-block'>
                    <p>[Reflex = Perception] This is the default passive DEF score. No roll is made and no Fast action is required.</p>
                </div>
            </div>
            <button id='HealthBtn' class='Btn'>HEALTH (HP)</button>
            <div id='HealthSec' class='stat-block'>
                <p>[Torso HP = C x2. Head, Arm, and Leg HP = C.]</p>
                <p>Limbs are disabled at 0 HP and destroyed at -C HP. At 0 Head or Torso HP, you fall unconscious. Head or Torso HP at -C is fatal.</p>
                <button id='BleedingBtn' class='Btn'>BLEEDING</button>
                <div id='BleedingSec' class='stat-block'>
                    <p>1DMG/min to Torso. Started by DMG or a Botched Medicine(Surgery). Roll C# = DMG 1/min to stop Bleeding. Pain penalty applies. Use Medicine(First-Aid) to stop Bleeding with MEDICAL Gear or 1FDMG to cauterize a wound.</p>
                </div>
                <button id='ArmorBtn' class='Btn'>ARMOR (AR)</button>
                <div id='ArmorSec' class='stat-block'>
                    <p>Armor converts DMG up to its AR into BDMG. If the ATK is BDMG, BDMG is reduced by AR. Any DMG that exceeds AR is dealt to HP, and the Armor’s AR is reduced by 1.</p>
                </div>
            </div>
            <button id='DamageBtn' class='Btn'>DAMAGE (DMG)</button>
            <div id='DamageSec' class='stat-block'>
                <p>ATKs do DMG to HP = Weapon DMG + (ATK - DEF). All DMG adds Pain. Any DMG that is not Blunt causes Bleeding. If DMG from one ATK exceeds the target’s C, the target falls Prone.</p>
                <p>Melee and Ranged(Throw) DMG are modified by C:</p>
                <p>C 1 and 2 = -1 DMG, C 3 and 4 = +0 DMG, C 5 and 6 = +1 DMG.</p>
                <p>Head DMG Stuns 1rnd. Arm DMG makes you drop anything you are holding. Leg DMG inflicts a -1 Speed penalty per DMG.</p>
                <button id='BluntBtn' class='Btn'>BLUNT (BDMG)</button>
                <div id='BluntSec' class='stat-block'>
                    <p>BDMG is only Pain until it exceeds the Threshold [C + D], then it is lethal. Any MATK can be Blunt.</p>
                </div>
                <button id='FireBtn' class='Btn'>FIRE (FDMG)</button>
                <div id='FireSec' class='stat-block'>
                    <p>If FDMG drops a Location to 0HP, 1FDMG is permanent. Fire-Resistant (FR) ARMOR reduces FDMG by its AR, and does not lose AR from FDMG.</p>
                </div>
                <button id='PainBtn' class='Btn'>PAIN</button>
                <div id='PainSec' class='stat-block'>
                    <p>-1 to all rolls. Non-lethal Pain fades by 1 per 10mins. Go unconscious if Pain exceeds Threshold [C + D].</p>
                </div>
            </div>
            <button id='RecoveryBtn' class='Btn'>RECOVERY</button>
            <div id='RecoverySec' class='stat-block'>
                <p>Non-lethal Pain fades away at 1 point per 10mins. After a full day’s rest, roll C# = total DMG (Pain penalty applies) to heal 1HP naturally on a random wounded Location. On a Fail, take 1 Torso DMG from infection. Amputating a limb prevents infection.</p>
                <p>If your Head or Torso is at 0HP or less, you are unconscious until both heal back to 1HP. When any Location drops to 0HP, it is disabled and you must get Surgery before you can heal all DMG naturally, otherwise it loses 1HP permanently.</p>
            </div>
            <button id='DeathBtn' class='Btn'>DEATH</button>
            <div id='DeathSec' class='stat-block'>
                <p>You drop unconscious and start Bleeding (if not already) when your Head or Torso goes to 0HP. You die when your Head or Torso HP drops to -C. When you die, your Comrades take -1 Psyche from grief. You can make a new Character with bonus starting XP = half of your old Character's Total XP (round down).</p>
            </div>
        </div>
    {/if}
</div>

<style>
</style>