import { reactive} from "vue";

export const selectedItems = reactive({
    /* {
        "ForgeIron": 1
    } */
    list: {} as any,
    get() {
        return this.list
    },
    set(newItems: any) : void {
        this.list = newItems
    },
    add(addItem: string) : void {
        if (Object.keys(this.list).includes(addItem)) {
            if (this.list[addItem] < 10) {
                this.list[addItem] = this.list[addItem] + 1
            }
        } else {
            if (Object.keys(this.list).length < 5) {
                this.list[addItem] = 1
            }
        }
    },
    remove(removeItem: string, amount = 0) : void {
        if (amount > 0) {
            if ((this.list[removeItem] - amount) <= 0) {
                delete this.list[removeItem]
            } else {
                this.list[removeItem] = this.list[removeItem] - amount
            }

        } else {
            delete this.list[removeItem]
        }
    },
    clear() {
        this.list = [] as string[]
    }
})

export const outputItems = reactive({
    /* {
        "ForgeIron": {
            amount: 1,
            rarity?: rarityNumber,
            type?: Helmet | Shield | Bag,
            perkInfo: [
                {
                    perk?: GearPerk,
                    strength?: GearStrength
                }
            ]
                
        }
    } */
    list: {} as any,
    get() {
        return this.list
    },
    set(newItems: any) : void {
        this.list = newItems
    },
    add(itemName: string, itemData : any, stackable = false) : void {
        if (Object.keys(this.list).includes(itemName) && stackable) {
            if (this.list[itemName]['amount'] < 10) {
                this.list[itemName]['amount'] = this.list[itemName]['amount'] + 1
            }
        } else {
            if (Object.keys(this.list).length < 5) {
                this.list[itemName] = {...itemData, amount: 1}
            }
        }
    },
    remove(removeItem: string, amount : number = 0 ) : void {
        if (amount > 0) {
            this.list[removeItem] = this.list[removeItem] - amount
        } else {
            delete this.list[removeItem]
        }
    },
    clear() {
        this.list = [] as string[]
    }
})