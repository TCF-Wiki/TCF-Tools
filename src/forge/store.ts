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
    remove(removeItem: string) : void {
        delete this.list[removeItem]
    }
})