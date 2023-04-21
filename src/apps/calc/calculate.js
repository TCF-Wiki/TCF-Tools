import { weaponData, targetData, armorData } from "./data";
import { selectedTarget, selectedArmor, selectedAccuracy, selectedHSValue, selectedDistance, selectedWeakspotValue } from "./store";
import { attachment } from './attachment'
import { roundToOne } from "./utils";

// this object contains the runtime options we want to use during calculation. 
// In cases of charts, or specific tables, we want to use different values than the ones the user has set. This allows us to do so.
let runTimeSettings = {
    default: {
        target: selectedTarget.selected,
        armor: selectedArmor.selected,
        armorValue: null,
        accuracy: selectedAccuracy.value,
        hsAccuracy: selectedHSValue.HSValue,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    },
    shotsToKillTableBody: {
        target: "PlayerDefault",
        armor: null,
        armorValue: null,
        accuracy: 100,
        hsAccuracy: 0,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    },
    shotsToKillTableHead: {
        target: "PlayerDefault",
        armor: null,
        armorValue: null,
        accuracy: 100,
        hsAccuracy: 100,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    },
    shotsToKillChart: {
        target: "PlayerDefault",
        armor: null,
        armorValue: null,
        accuracy: selectedAccuracy.accuracy,
        hsAccuracy: selectedHSValue.HSValue,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    },
    timeToKill: {
        target: selectedTarget.target,
        armor: selectedArmor.selected,
        accuracy: null,
        armorValue: null,
        hsAccuracy: 0,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    },
}
export function updateRunTimeSettings() {
    runTimeSettings.default = {
        target: selectedTarget.selected,
        armor: selectedArmor.selected,
        armorValue: null,
        accuracy: selectedAccuracy.value,
        hsAccuracy: selectedHSValue.HSValue,
        distance: selectedDistance.distance,
        weakspotValue: selectedWeakspotValue.value
    }

    runTimeSettings.shotsToKillTableBody.distance      = selectedDistance.distance
    runTimeSettings.shotsToKillTableBody.weakspotValue = selectedWeakspotValue.value

    runTimeSettings.shotsToKillTableHead.distance      = selectedDistance.distance
    runTimeSettings.shotsToKillTableHead.weakspotValue = selectedWeakspotValue.value

    runTimeSettings.shotsToKillChart.accuracy          = selectedAccuracy.value
    runTimeSettings.shotsToKillChart.hsAccuracy        = selectedHSValue.HSValue
    runTimeSettings.shotsToKillChart.distance          = selectedDistance.distance
    runTimeSettings.shotsToKillChart.weakspotValue     = selectedWeakspotValue.value

    runTimeSettings.timeToKill.target                  = selectedTarget.selected
    runTimeSettings.timeToKill.armor                   = selectedArmor.selected
    runTimeSettings.timeToKill.distance                = selectedDistance.distance
    runTimeSettings.timeToKill.weakspotValue           = selectedWeakspotValue.value
    runTimeSettings.timeToKill.hsAccuracy              = selectedHSValue.HSValue

}

let settings = runTimeSettings.default
export function setRunTimeSettings(type) {
    settings = runTimeSettings[type]
}

export function setRunTimeSettingsArmor(armorValue) {
    settings["armorValue"] = armorValue
}

export function setRunTimeSettingsAccuracy(accuracyValue) {
    settings["accuracy"] = accuracyValue
}

let curWeapon = ''
export function setCurrentWeapon(weapon) {
    curWeapon = weapon
}

export const calculate = {
    damagePerMag: function(armorOverride) {
        return ( 
            this.totalClicksPerMag()
            * this.totalDamagePerClick(armorOverride)
        )
    },

    roundsPerMinute: function() {
        // this function is NOT reload adjusted. Calculates the rounds per minute
        // a round is a bullet which is fired at one exact moment
        // shotgun pellets are counted as 1 total round.
        const roundsPerMagazine = this.roundsPerClick() * this.totalClicksPerMag()
        const magazinesPerMinute = 60 / this.totalTimeToEmptyMag()

        return magazinesPerMinute * roundsPerMagazine
    },

    roundsPerMinuteReloadAdjusted: function() {
        // like rounds per minute, but takes reloads into account.
        const roundsPerMagazine = this.roundsPerClick() * this.totalClicksPerMag()
        const magazinesPerMinute = 60 / ( this.totalTimeToEmptyMag() + this.s('reloadTime') )

        return magazinesPerMinute * roundsPerMagazine

    },

    damagePerSecond: function() {
        // calculates 'averaged' damage in a second (rather than calculating damage in the first second)
        return this.damagePerMag() /  this.totalTimeToEmptyMag() 
    },

    damagePerSecondReloadAdjusted: function() {
        // calculates 'averaged' damage in a second, accounting for reloads
        return this.damagePerMag() /  ( this.totalTimeToEmptyMag() + this.s('reloadTime') )
    },

    totalTimeToEmptyMag: function() {
        // calculates the time it takes to empty a magazine
        // automatic weapon + chargeup, where 1 click = all bullets in a mag
        if (curWeapon.includes('WP_G_HVY_Beam')) {
            return (
                (
                    // true mag size
                    ( this.s('ammoInClip') / this.s('ammoPerBullet') )
                    * this.s(weapon, 'refireTime')
                )
                + this.s('spinupTime')
                - this.s('refireTime')
            )
        }

        return (
            (
            this.totalTimePerClick() 
            * this.totalClicksPerMag()
            ) 
            - this.s('refireTime')
        )
    },

    shotsToKill: function() {
        let hp = targetData[settings.target].health

        let clicks = hp / this.totalDamagePerClick()
        let shots = clicks * ( this.s('amountOfBurst') + 1 )

        // adjust for small JS rounding errors (e.g. PDW vs exotic armor)
        let remaining = shots % Math.floor(shots)
        if (remaining < 0.000001) return Math.floor(shots)
        
        return Math.ceil(shots)
    },

    timeToKill: function() {
        let hp = targetData[settings.target].health;
        let shots = this.shotsToKill();
        let clicks = shots / ( this.s('amountOfBurst') + 1 )
        if (clicks == 1) return this.s('spinupTime')

        // amount of 'full' shots we need to kill
        let fullBurstTime = Math.floor(clicks) * this.totalTimePerClick()

        // figure out the remaining amount of burst bullets we need to shoot. 
        // count the total time that partial burst takes to shoot.
        // removing the trailing interval, as that occurs after the shot kills.
        let remainingBurstBullets = shots % ( this.s('amountOfBurst') + 1 )
        let remainingBurstTime = 0;
        if (remainingBurstBullets) {
            remainingBurstTime = (
                this.s('spinupTime')
                + (
                    remainingBurstBullets
                    * this.s('burstInterval')
                )
                - this.s('burstInterval')
            )
        }
        

        // time for all bullets to be shot, ignoring reloads.
        let time = fullBurstTime + remainingBurstTime

        // adjust for reloads in case it takes more then one reload
        // which mostly happens with creatures
        let DPM = this.damagePerMag();
        let ratio = hp / DPM;
        time += Math.floor(ratio) * this.s('reloadTime');

        // adjust for zeus beam. Since it is automatic with charge up, the math is a bit different
        // for each magazine, there is 1 spinup time, instead of for each shot.
        if (curWeapon.includes('WP_G_HVY_Beam')) {
            time = (
                ( clicks * this.s('refireTime') )
                + ( Math.ceil(ratio)) * this.s('spinupTime')
                + Math.floor(ratio) * this.s('reloadTime')
            )
        }

        // remove trailing refire time which occur after the last shot of a magazine (or last shot which killed)
        if (remainingBurstBullets === 0) {
            time = time - ( Math.ceil(ratio) * this.s('refireTime') )
        }

        return time;
    },

    roundsPerClick: function() {
        return (
            ( this.s('amountOfBurst') + 1 )
            // * this.s(weapon, 'amountOfImmediateFires')
        )
    },
    totalDamagePerClick: function() {
        return roundToOne(
            // raw bullet damage
            ( 
                ( this.s('directDamage') + this.s('radialDamage') )
                * this.getShotModifiers()
            )
            // adjust for burst and shotguns.
            * this.s('amountOfImmediateFires')
            * ( this.s('amountOfBurst') + 1 )
        )
    },

    totalTimePerClick: function() {
        // Zeus beam is a special case (since it is automatic + chargeup), 
        // so is not handled by this function. Should be handled in the appropiate calc instead.
        return (
            // burst time
            ( ( this.s('amountOfBurst') ) 
            * ( this.s('burstInterval') > 0 ? this.s('burstInterval') : 0 )
            )
            // general time
            + this.s('refireTime')
            + this.s('spinupTime')
        )
    },

    totalClicksPerMag: function( ) {
        return (
            // true mag size
            this.s('ammoInClip') / this.s('ammoPerBullet')
            // accounting for burst amount
            / ( this.s('amountOfBurst') + 1 )
        )
    },

    damageOnBodyShot: function() {
        // To get damage on a body shot
        return (
            // raw bullet damage
            (this.s('directDamage') + this.s('radialDamage') * this.s('amountOfImmediateFires')) 
            // modifiers, excluding headshot
            * this.penetrationMultiplier() 
            * this.falloffMultiplier() 
            * this.creatureDamageMult()
        )
    },
    damageOnWeakSpotShot: function() {
        // To get damage on a weakspot hit
        return (
            // raw bullet damage
            (this.s('directDamage') + this.s('radialDamage') * this.s('amountOfImmediateFires')) 
            // modifiers
            * this.penetrationMultiplier() 
            * this.falloffMultiplier() 
            * this.creatureDamageMult()
            * this.s('weakDamageMultiplier')
        )
    },
    penetrationMultiplier: function() {
        let target = targetData[settings.target]
        let penDiff;

        if (settings.armorValue) {
            penDiff = this.s('penetration') - settings.armorValue
        } else if (settings.target == "PlayerDefault" && settings.armor) {
            penDiff = this.s('penetration') - armorData[settings.armor]['armorAmount']
        } else {
            penDiff = this.s('penetration') - target.armorValue
        }
    
        let hp = target.health;
        let armorScale = target.armorConstant;
        let min = target.minDamageReduction;
        let max = target.maxDamageReduction;
    
        let eHP = hp + Math.abs(penDiff) * armorScale * hp;
        let ratio = hp / eHP;
        
        if (penDiff > 0) ratio = 2 - ratio;
    
        if (ratio > max) ratio = max;
        if (ratio < min) ratio = min;
    
        return ratio;
    },

    falloffMultiplier: function() {
        let distance = parseInt(settings.distance) * 100;
        
        let start = this.s('FalloffStart');
        let end = this.s('FalloffEnd');
        let mult = this.s('FalloffMultiplier');

        if (distance >= end) return mult;
        if (distance <= start) return 1;

        let wRatio = distance - start;
        let fRatio = end - start;
        
        return 1 - (wRatio / fRatio) * (1 - mult);
    },

    headShotMult: function() {
        if (settings.target != 'PlayerDefault') {
            let HSPercent = settings.hsAccuracy;
            return 1 + ((settings.weakspotValue - 1) * HSPercent) / 100;
        };

        let hsMult = this.s('weakDamageMultiplier');
        let HSPercent = settings.hsAccuracy;
        return 1 + ((hsMult - 1) * HSPercent) / 100;
    },

    creatureDamageMult: function () {
        if (settings.target != 'PlayerDefault') {
            const effects = attachment.getAttachmentEffects(curWeapon)
            
            if (effects['DamageEnemyMultiplier']) {
                return effects['DamageEnemyMultiplier']['value']
            }
        }
        return 1

    },
    getShotModifiers: function() {
        return ( 
            ( settings.accuracy / 100 )
            * this.headShotMult() 
            * this.penetrationMultiplier() 
            * this.falloffMultiplier() 
            * this.creatureDamageMult()
        )
    },

    savedWeaponData: {},
    s: function(stat) {
        let wData = weaponData[curWeapon]

        let effects = attachment.getAttachmentEffects(curWeapon)

        let value = wData[stat]
        if (effects.hasOwnProperty(stat)) {
            let effect = effects[stat]
            if (effect['type'] == 'Additive') {
                return value + effect['value']
            } 

            if (effect['type'] == 'Multiplicitive_PreAdd') {
                return value * effect['value']
            }

            if (effect['type'] == 'Override') {
                return effect['value']
            }
        } else {
            return value
        }
    }
}