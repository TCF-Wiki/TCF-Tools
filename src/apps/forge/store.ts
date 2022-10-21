import { reactive} from "vue";

const MAX_PER_SLOT = 9
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
    add(itemName: string, amount = 1) : void {
        if (Object.keys(this.list).includes(itemName)) {
            if (this.list[itemName] < MAX_PER_SLOT) {
                if ((this.list[itemName] + amount) <= MAX_PER_SLOT) {
                    this.list[itemName] = this.list[itemName] + amount
                } else {
                    this.list[itemName] = amount
                }
            }
        } else {
            if (Object.keys(this.list).length < 5) {
                if (amount <= MAX_PER_SLOT) {
                    this.list[itemName] = amount
                } else {
                    this.list[itemName] = MAX_PER_SLOT
                }
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
        this.list = {} as any
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
    add(itemName: string, amount = 1, itemData? : any, stackable = false) : void {
        if (Object.keys(this.list).includes(itemName) && stackable) {
            if (this.list[itemName]['amount'] < MAX_PER_SLOT) {
                if ((this.list[itemName]['amount'] + amount) <= MAX_PER_SLOT) {
                    this.list[itemName]['amount'] + amount
                } else {
                    this.list[itemName]['amount'] = amount
                }
            }
        } else {
            if (Object.keys(this.list).length < 5) {
                if (amount <= MAX_PER_SLOT) {
                    this.list[itemName] = {...itemData, amount: amount}
                } else {
                    this.list[itemName] = {...itemData, amount: MAX_PER_SLOT}
                }
            }
        }
    },
    remove(itemName: string, amount : number = 0 ) : void {
        if (amount !== 0 && (this.list[itemName]['amount'] - amount) > 0) {
            this.list[itemName] = this.list[itemName]['amount'] - amount
        } else {
            delete this.list[itemName]
        }
    },
    clear() {
        this.list = {} as any
    }
})

export const consumeInput = reactive({
    consume: true as boolean,
    get() {
        return this.consume
    },
    set(consume: boolean) {
        this.consume = consume
    },
    toggle() {
        this.consume = !this.consume
    }
})