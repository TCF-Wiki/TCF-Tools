import { weaponData, targetData, armorData } from "./data";
import { selectedTarget, selectedArmor, selectedHSValue, selectedDistance } from "./store";
import { attachment } from './attachment'
export const calculate = {
    penetrationMultiplier: function(weapon) {
        let target = targetData[selectedTarget.selected]
        let penDiff;
        if (selectedTarget.selected == 'PlayerDefault' && selectedTarget.selected != 'None') {
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

    roundsPerMinute: function(weapon) {
        if (weapon == 'WP_G_HVY_Beam_01') return ( 60 - this.s(weapon,'spinupTime') ) / this.s(weapon,'refireTime');

        return (60 / ((this.s(weapon,'spinupTime') + this.s(weapon,'refireTime') + ((this.s(weapon,'amountOfBurst') + 1 ) * (this.s(weapon,'burstInterval') != -1 ? this.s(weapon,'burstInterval') : 0 ) ) )  ) * (this.s(weapon,'amountOfBurst') + 1) );
    },

    adjustedRPM: function(weapon) {
        if (this.s(weapon,'amountOfBurst') > 0) {
            let timePerBurst = this.s(weapon,'refireTime') + this.s(weapon,'spinupTime') + ((this.s(weapon,'amountOfBurst') + 1 ) * this.s(weapon,'burstInterval') );
            let burstPerMag =  ( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') ) / (this.s(weapon,'amountOfBurst') + 1);
            let timePerMag = timePerBurst * burstPerMag + this.s(weapon,'reloadTime');
            let magsPerMinute = 60 / timePerMag;
            return magsPerMinute * ( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') );
        }

        let timePerMag = (( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') )) * (this.s(weapon,'refireTime') + this.s(weapon,'spinupTime')) + this.s(weapon,'reloadTime');

        if (weapon == 'WP_G_HVY_Beam_01') {
            timePerMag = (( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') )) * this.s(weapon,'refireTime') + this.s(weapon,'spinupTime') + this.s(weapon,'reloadTime');
        }

        if (weapon == 'WP_A_Sniper_Gauss_01') {
            timePerMag = this.s(weapon,'ammoInClip') * this.s(weapon,'spinupTime') + (this.s(weapon,'ammoInClip') - 1) * this.s(weapon,'refireTime') + this.s(weapon,'reloadTime');
        }

        return (60 / timePerMag) * ( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') );
    },

    damagePerSecond: function(weapon) {
        return (this.roundsPerMinute(weapon) / 60) * ((this.s(weapon,'directDamage') + this.s(weapon,'radialDamage')) * this.s(weapon,'amountOfImmediateFires') * this.getShotModifiers(weapon));
    },

    adjustedDPS: function(weapon) {
        return (this.adjustedRPM(weapon) / 60) * ((this.s(weapon,'directDamage') + this.s(weapon,'radialDamage')) * this.s(weapon,'amountOfImmediateFires') * this.getShotModifiers(weapon));
    },

    damagePerMag: function(weapon) {
        return ( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') ) * (this.s(weapon,'directDamage') + this.s(weapon,'radialDamage')) * this.s(weapon,'amountOfImmediateFires') * this.getShotModifiers(weapon);
    },

    timeToEmpty: function(weapon) {
        let timeAMag = ((( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') ) / (this.s(weapon,'amountOfBurst') + 1) )) * (this.s(weapon,'refireTime') + this.s(weapon,'spinupTime') + ( (this.s(weapon,'amountOfBurst') + 1 ) * (this.s(weapon,'burstInterval') != -1 ? this.s(weapon,'burstInterval') : 0 ) ) );


        if (weapon == 'WP_G_HVY_Beam_01') {
            return (timeAMag = (( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') ) - 1) * this.s(weapon,'refireTime') + this.s(weapon,'spinupTime'));
        }

        if (weapon == 'WP_A_Sniper_Gauss_01') {
            return (timeAMag = ( this.s(weapon,'ammoInClip') / this.s(weapon, 'ammoPerBullet') ) * this.s(weapon, 'spinupTime') + (( this.s(weapon,'ammoInClip') / this.s(weapon,'ammoPerBullet') ) - 1) * this.s(weapon,'refireTime'));
        }
        return timeAMag;
    },

    shotsToKill: function(weapon) {
        let hp = targetData[selectedTarget.selected].health;

        let shots = hp / ((this.s(weapon, "directDamage") + this.s(weapon, 'radialDamage') ) * Math.max(this.s(weapon, "amountOfBurst") + 1, 1) * this.s(weapon, 'amountOfImmediateFires') * this.getShotModifiers(weapon)) * Math.max(this.s(weapon, 'amountOfBurst') + 1, 1)

        // adjust for small rounding errors (e.g. PDW vs exotic armor)
        let remaining = shots % Math.floor(shots)
        if (remaining < 0.000001) return Math.floor(shots)
        
        return Math.ceil(shots)
    },

    timeToKill: function(weapon) {
        let hp = targetData[selectedTarget.selected].health;
        let shots = this.shotsToKill(weapon) / Math.max(this.s(weapon,'amountOfBurst') + 1, 1);

        let DPM = this.damagePerMag(weapon);
        let ratio = hp / DPM;

        if (weapon == 'WP_G_HVY_Beam_01') {
            return this.s(weapon,'refireTime') * (shots - Math.ceil(ratio)) + Math.floor(ratio) * (this.s(weapon,'reloadTime') + this.s(weapon,'spinupTime'));
        }

        if (shots == 1) return this.s(weapon,'spinupTime');

        return this.s(weapon,'spinupTime') + this.s(weapon,'refireTime') * (shots - Math.ceil(ratio)) + Math.floor(ratio) * this.s(weapon,'reloadTime');
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

    headShotMult: function(weapon) {
        if (selectedTarget.selected != 'PlayerDefault') return 1;
        let hsMult = this.s(weapon, 'weakDamageMultiplier');
        let HSPercent = selectedHSValue.HSValue;
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
    getShotModifiers: function(weapon) {
        return this.headShotMult(weapon) * this.penetrationMultiplier(weapon) * this.falloffMultiplier(weapon) * this.creatureDamageMult(weapon);
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
