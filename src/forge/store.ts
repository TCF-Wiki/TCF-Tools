import { reactive} from "vue";

export const selectedItems = reactive({
    list: [] as string[],
    get() : string[] {
        return this.list
    },
    set(newItems: string[]) : void {
        this.list = newItems
    },
    add(addItem: string) : void {
        this.list.push(addItem)
    },
    remove(removeItem: string) : void {
        this.list = this.list.filter((a) => {
            return a !== removeItem;
        });
    }
})