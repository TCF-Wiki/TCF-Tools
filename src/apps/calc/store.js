import { reactive } from 'vue'

export const selectedWeapons = reactive({
    list: ['WP_D_AR_Bullet_01','WP_G_Sniper_Energy_01'],
    set(data) {
        this.list = data
    },
    toggleSelected(weapon) {
        if (this.list.includes(weapon)) {
        this.list = this.list.filter( a => a !== weapon)
        } else {
            this.list.push(weapon)
        }
    }
})

export const selectedArmor = reactive({
    selected: 'Shield_01',
    changeSelected(armor) {
        this.selected = armor;
    }
})

export const selectedTarget = reactive({
    selected: 'PlayerDefault',
    changeSelected(target) {
        this.selected = target;
        selectedWeakspotValue.changeValue(1)
    }
})

export const selectedHSValue = reactive({
    HSValue: 0,
    changeValue(value) {
        this.HSValue = value;
    }
})

export const selectedDistance = reactive({
    distance: 0,
    changeValue(value) {
        this.distance = value;
    }
})

export const selectedAttachments = reactive({
    list: {},
    typeList: {},
    setList(data) {
        this.list = data
    },
    setTypeList(data) {
        this.typeList = data
    },
    toggleSelected(weapon, attachment, type) {
        if (attachment == null) {
            let currentAttachment = this.typeList[weapon][type]
            delete this.typeList[weapon][type]
            this.list[weapon] = this.list[weapon].filter( a => a !== currentAttachment)
            // if this weapon already exists
        } else if (this.list[weapon]) {
            if (this.list[weapon].includes(attachment)) {
                // Toggles something off if it already exists.
                this.list[weapon] = this.list[weapon].filter( a => a !== attachment)
                delete this.typeList[weapon][type]
            } else {
                // add the attachment
                this.list[weapon].push(attachment)
                if (this.typeList[weapon][type]) {
                    // remove any other attachments in that cateogry
                    this.list[weapon] = this.list[weapon].filter( a => a !== this.typeList[weapon][type])
                    this.typeList[weapon][type] = attachment
                } else {
                // or simply set the category to this attachment
                    this.typeList[weapon][type] = attachment
                }
            }
        } else {
            // otherwise, save the data for this weapon for the first time
            this.list[weapon] = []
            this.list[weapon].push(attachment)
            this.typeList[weapon] = {}
            this.typeList[weapon][type] = attachment
        }
    }
})

export const selectedWeakspotValue = reactive({
    value: 1,
    changeValue(value) {
        this.value = value;
    }
})