import { weaponData, targetData, armorData } from "./data";
import { selectedTarget, selectedArmor, selectedHSValue, selectedDistance, selectedWeakspotValue } from "./store";
import { attachment } from './attachment'

export const calculate = {
    damagePerMag: function(weapon, armorOverride) {
        return ( 
            this.totalClicksPerMag(weapon)
            * this.totalDamagePerClick(weapon, armorOverride)
        )
    },

    roundsPerMinute: function(weapon) {
        // this function is NOT reload adjusted. Calculates the rounds per minute
        // a round is a bullet which is fired at one exact moment
        // shotgun pellets are counted as 1 total round.
        const roundsPerMagazine = this.roundsPerClick(weapon) * this.totalClicksPerMag(weapon)
        const magazinesPerMinute = 60 / this.totalTimeToEmptyMag(weapon)

        return magazinesPerMinute * roundsPerMagazine
    },

    roundsPerMinuteReloadAdjusted: function(weapon) {
        // like rounds per minute, but takes reloads into account.
        const roundsPerMagazine = this.roundsPerClick(weapon) * this.totalClicksPerMag(weapon)
        const magazinesPerMinute = 60 / ( this.totalTimeToEmptyMag(weapon) + this.s(weapon, 'reloadTime') )

        return magazinesPerMinute * roundsPerMagazine

    },

    damagePerSecond: function(weapon) {
        // calculates 'averaged' damage in a second (rather than calculating damage in the first second)
        return this.damagePerMag(weapon) /  this.totalTimeToEmptyMag(weapon) 
    },

    damagePerSecondReloadAdjusted: function(weapon) {
        // calculates 'averaged' damage in a second, accounting for reloads
        return this.damagePerMag(weapon) /  ( this.totalTimeToEmptyMag(weapon) + this.s(weapon, 'reloadTime') )
    },

    totalTimeToEmptyMag: function(weapon) {
        // calculates the time it takes to empty a magazine
        // automatic weapon + chargeup, where 1 click = all bullets in a mag
        if (weapon.includes('WP_G_HVY_Beam')) {
            return (
                (
                    // true mag size
                    ( this.s(weapon, 'ammoInClip') / this.s(weapon, 'ammoPerBullet') )
                    * this.s(weapon, 'refireTime')
                )
                + this.s(weapon, 'spinupTime')
                - this.s(weapon, 'refireTime')
            )
        }

        return (
            (
            this.totalTimePerClick(weapon) 
            * this.totalClicksPerMag(weapon)
            ) 
            - this.s(weapon, 'refireTime')
        )
    },

    shotsToKill: function(weapon, armorOverride, hsMultiplier, source='normal') {
        let hp;
        if (armorOverride !== undefined) {
            hp = targetData['PlayerDefault'].health
        } else {
            hp = targetData[selectedTarget.selected].health;
        }

        let clicks = hp / this.totalDamagePerClick(weapon, armorOverride, hsMultiplier, source)
        let shots = clicks * ( this.s(weapon, 'amountOfBurst') + 1 )

        // adjust for small JS rounding errors (e.g. PDW vs exotic armor)
        let remaining = shots % Math.floor(shots)
        if (remaining < 0.000001) return Math.floor(shots)
        
        return Math.ceil(shots)
    },

    timeToKill: function(weapon) {
        let hp = targetData[selectedTarget.selected].health;
        let shots = this.shotsToKill(weapon);
        let clicks = shots / ( this.s(weapon, 'amountOfBurst') + 1 )
        if (clicks == 1) return this.s(weapon, 'spinupTime')

        // amount of 'full' shots we need to kill
        let fullBurstTime = Math.floor(clicks) * this.totalTimePerClick(weapon)

        // figure out the remaining amount of burst bullets we need to shoot. 
        // count the total time that partial burst takes to shoot.
        // removing the trailing interval, as that occurs after the shot kills.
        let remainingBurstBullets = shots % ( this.s(weapon, 'amountOfBurst') + 1 )
        let remainingBurstTime = 0;
        if (remainingBurstBullets) {
            remainingBurstTime = (
                this.s(weapon, 'spinupTime')
                + (
                    remainingBurstBullets
                    * this.s(weapon, 'burstInterval')
                )
                - this.s(weapon, 'burstInterval')
            )
        }
        

        // time for all bullets to be shot, ignoring reloads.
        let time = fullBurstTime + remainingBurstTime

        // adjust for reloads in case it takes more then one reload
        // which mostly happens with creatures
        let DPM = this.damagePerMag(weapon);
        let ratio = hp / DPM;
        time += Math.floor(ratio) * this.s(weapon, 'reloadTime');

        // adjust for zeus beam. Since it is automatic with charge up, the math is a bit different
        // for each magazine, there is 1 spinup time, instead of for each shot.
        if (weapon.includes('WP_G_HVY_Beam')) {
            time = (
                ( clicks * this.s(weapon, 'refireTime') )
                + ( Math.ceil(ratio)) * this.s(weapon, 'spinupTime')
                + Math.floor(ratio) * this.s(weapon, 'reloadTime')
            )
        }

        // remove trailing refire time which occur after the last shot of a magazine (or last shot which killed)
        if (remainingBurstBullets === 0) {
            time = time - ( Math.ceil(ratio) * this.s(weapon, 'refireTime') )
        }

        return time;
    },

    roundsPerClick: function(weapon) {
        return (
            ( this.s(weapon, 'amountOfBurst') + 1 )
            // * this.s(weapon, 'amountOfImmediateFires')
        )
    },
    totalDamagePerClick: function(weapon, armorOverride, hsMultiplier, source) {
        return (
            // raw bullet damage
            ( 
                ( this.s(weapon, 'directDamage') + this.s(weapon, 'radialDamage') )
                * this.getShotModifiers(weapon, armorOverride, hsMultiplier, source)
            )
            // adjust for burst and shotguns.
            * this.s(weapon, 'amountOfImmediateFires')
            * ( this.s(weapon, 'amountOfBurst') + 1 )
        )
    },

    totalTimePerClick: function(weapon) {
        // Zeus beam is a special case (since it is automatic + chargeup), 
        // so is not handled by this function. Should be handled in the appropiate calc instead.
        return (
            // burst time
            ( ( this.s(weapon, 'amountOfBurst') ) 
            * ( this.s(weapon, 'burstInterval') > 0 ? this.s(weapon, 'burstInterval') : 0 )
            )
            // general time
            + this.s(weapon, 'refireTime')
            + this.s(weapon, 'spinupTime')
        )
    },

    totalClicksPerMag: function(weapon ) {
        return (
            // true mag size
            this.s(weapon, 'ammoInClip') / this.s(weapon, 'ammoPerBullet')
            // accounting for burst amount
            / ( this.s(weapon, 'amountOfBurst') + 1 )
        )
    },

    damageOnBodyShot: function(weapon, armorOverride) {
        // To get damage on a body shot
        return (
            // raw bullet damage
            (this.s(weapon, 'directDamage') + this.s(weapon, 'radialDamage') * this.s(weapon, 'amountOfImmediateFires')) 
            // modifiers, excluding headshot
            * this.penetrationMultiplier(weapon, armorOverride) 
            * this.falloffMultiplier(weapon, armorOverride) 
            * this.creatureDamageMult(weapon)
        )
    },
    damageOnWeakSpotShot: function(weapon, armorOverride) {
        // To get damage on a weakspot hit
        return (
            // raw bullet damage
            (this.s(weapon, 'directDamage') + this.s(weapon, 'radialDamage') * this.s(weapon, 'amountOfImmediateFires')) 
            // modifiers
            * this.penetrationMultiplier(weapon, armorOverride) 
            * this.falloffMultiplier(weapon, armorOverride) 
            * this.creatureDamageMult(weapon)
            * this.s(weapon, 'weakDamageMultiplier')
        )
    },
    penetrationMultiplier: function(weapon, armorOverride) {
        let target = targetData[selectedTarget.selected]
        let penDiff;

        if (armorOverride !== undefined) {
            penDiff = this.s(weapon,'penetration') - armorOverride
            target = targetData['PlayerDefault']
        } else if (selectedTarget.selected == 'PlayerDefault' && selectedTarget.selected != 'None') {
            penDiff = this.s(weapon,'penetration') - armorData[selectedArmor.selected]['armorAmount']
        } else {
            penDiff =  this.s(weapon,'penetration') - target.armorValue
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

    falloffMultiplier: function(weapon) {
        let distance = parseInt(selectedDistance.distance) * 100;
        
        let start = this.s(weapon, 'FalloffStart');
        let end = this.s(weapon, 'FalloffEnd');
        let mult = this.s(weapon, 'FalloffMultiplier');

        if (distance >= end) return mult;
        if (distance <= start) return 1;

        let wRatio = distance - start;
        let fRatio = end - start;
        
        return 1 - (wRatio / fRatio) * (1 - mult);
    },

    headShotMult: function(weapon, hsMultiplier, source = 'normal') {
        if (selectedTarget.selected != 'PlayerDefault' && source == 'normal') {
            let HSPercent = selectedHSValue.HSValue;
            if (hsMultiplier) HSPercent = hsMultiplier
            return 1 + ((selectedWeakspotValue.value - 1) * HSPercent) / 100;
        };

        let hsMult = this.s(weapon, 'weakDamageMultiplier');
        let HSPercent = selectedHSValue.HSValue;
        if (hsMultiplier) HSPercent = hsMultiplier
        return 1 + ((hsMult - 1) * HSPercent) / 100;
    },

    creatureDamageMult: function (weapon) {
        if (selectedTarget.selected != 'PlayerDefault') {
            const effects = attachment.getAttachmentEffects(weapon)
            
            if (effects['DamageEnemyMultiplier']) {
                return effects['DamageEnemyMultiplier']['value']
            }
        }
        return 1

    },
    getShotModifiers: function(weapon, armorOverride, hsMultiplier, source = 'normal') {
        return ( 
            this.headShotMult(weapon, hsMultiplier, source) 
            * this.penetrationMultiplier(weapon, armorOverride) 
            * this.falloffMultiplier(weapon) 
            * this.creatureDamageMult(weapon)
        )
    },

    savedWeaponData: {},
    s: function(weapon, stat) {
        // let us not repeat ourselves 
        let wData;
        if (this.savedWeaponData[weapon]) {
            wData = this.savedWeaponData[weapon]
        } else {
            wData = weaponData[weapon]
            this.savedWeaponData[weapon] = wData
        }

        let effects = attachment.getAttachmentEffects(weapon)

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