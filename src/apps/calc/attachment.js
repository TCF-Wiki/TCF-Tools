import { weaponData, attachmentData } from './data'
import { unusableAttachments, ignoredEffects, lowercaseFirstLetter  } from './utils'
import { selectedAttachments } from './store'

export const attachment = {
    savedAttachmentList : {},
    getAttachments: function(weapon) {
        //let us not repeat this more then we need to do...
        if (this.savedAttachmentList[weapon]) {
            return this.savedAttachmentList[weapon]
        }

        // This function gets a list of compatible attachments for a weapon.
        let wData = weaponData[weapon]

        // The tags or the weapon type may be used to check if something is compatible
        let category = wData['tags'].concat(['Weapon.Ammo.'+ wData['ammoType']])

        let attachments = []
        for (let attachment in attachmentData) {
            let compatible = attachmentData[attachment]['compatible']

            // filter out mods without effects / effects we do not use
            if(!wData['modSlots'].includes(attachmentData[attachment]['modType'])) continue
            if (unusableAttachments.includes(attachmentData[attachment]['modType'])) continue
            
            // If it is compatible with everything, we save it
            if (compatible.length === 0) {
                attachments.push(attachment)
            }

            // Otherwise check if this mod is compatible with this weapon
            if (compatible.some(item => category.includes(item))) {
                attachments.push(attachment)
            } 
        }
        // save it to reuse...
        this.savedAttachmentList[weapon] = attachments
        // and return it
        return attachments
        
    },

    savedGroupedAttachmentList : {},
    groupAttachments: function(weapon) {
        // reuse if we have already figured this out before...
        if (this.savedGroupedAttachmentList[weapon]) {
            return this.savedGroupedAttachmentList[weapon]
        }

        //get all attachments for this weapon
        let attachmentsList = this.getAttachments(weapon);

        let attachmentGroups = {}
        for (let attach in attachmentData) {
            // If the attachment isn't compatible with this weapon, or is an empty attachment, skip it
            if (!attachmentsList.includes(attach)) continue
            if (attach.startsWith('No')) continue

            // get the category of the mod 
            let newCategory = attachmentData[attach]['modType']
            // save it to our object
            if(!attachmentGroups[newCategory]) attachmentGroups[newCategory] = [];
            attachmentGroups[newCategory].push(attach);
        }

        // save it to reuse in the future!
        this.savedGroupedAttachmentList[weapon] = attachmentGroups
        // and return it
        return attachmentGroups
    },

    getAttachmentEffects: function(weapon) {
        // this function creates an object of each weapon's effects, converted to a format we can use in this.s()
        // and to use the same keys 

        // get the used mods for this weapon
        let attachmentList = selectedAttachments.list[weapon];

        // create a list of each attachments' effects
        let effectList = []
        for (let attachment in attachmentList) {
            let effects = attachmentData[attachmentList[attachment]]['effects']
            for (let e in effects) {
                effectList.push(effects[e])
            }
        }

        // put it in an object with
        let effectUsableObject = {}
        for (let eff in effectList) {
            let a = effectList[eff]['attribute'] 
            if (ignoredEffects.includes(a)) continue
            if (a.startsWith('Weapon')) {
                a = a.replace('Weapon','')
                a = lowercaseFirstLetter(a)
            }
            if (a=='clipSize') a = "ammoInClip"
            if (a=='amountOfShots') a = "amountOfImmediateFires"
            if (a=='damageDirect') a = 'directDamage'
            if (a=='damageRange') {
                effectUsableObject['FalloffStart'] = {'value': effectList[eff]['value'] + weaponData[weapon]['FalloffStart'], 'type': effectList[eff]['type']}
                effectUsableObject['FalloffEnd'] = {'value': effectList[eff]['value'] + weaponData[weapon]['FalloffStart'], 'type': effectList[eff]['type']}   
            }

            effectUsableObject[a] = {'value': effectList[eff]['value'], 'type': effectList[eff]['type']}
        }
        return effectUsableObject
    }
}