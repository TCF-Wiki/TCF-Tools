import { reactive } from 'vue'

export const selectedWeapons = reactive({
    list: ['WP_D_AR_Bullet_01','WP_G_Sniper_Energy_01'],
    toggleSelected(weapon) {
        if (this.list.includes(weapon)) {
        this.list = this.list.filter( a => a !== weapon)
        } else {
            this.list.push(weapon)
        }
    }
})

export const selectedArmor = reactive({
    selected: 'PlayerDefault',
    changeSelected(armor) {
        this.selected = armor;
    }
})

export const selectedTarget = reactive({
    selected: 'PlayerDefault',
    changeSelected(target) {
        this.selected = target;
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
    toggleSelected(weapon, attachment, type) {
        if (this.list[weapon]) {
            if (this.list[weapon].includes(attachment)) {
                this.list[weapon] = this.list[weapon].filter( a => a !== attachment)
                delete this.typeList[weapon][type]
            } else {
                this.list[weapon].push(attachment)
                if (this.typeList[weapon][type]) {
                    this.list[weapon] = this.list[weapon].filter( a => a !== this.typeList[weapon][type])
                    this.typeList[weapon][type] = attachment
                } else {
                    this.typeList[weapon][type] = attachment
                }
            }
        } else {
            this.list[weapon] = []
            this.list[weapon].push(attachment)
            this.typeList[weapon] = {}
            this.typeList[weapon][type] = attachment
        }
    }
})
