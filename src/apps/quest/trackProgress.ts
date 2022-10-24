import { missions } from './QuestConstants'
import { reactive } from 'vue'
import { techTreeData } from './data'
type progressionList = {
    [key: string]: { 
        [key: string]: number
            // which part the user is on
    }
}

type quarterList = {
    [key: string]:  number
            // which part the user is on
    
}


// Handle if a new season has started.
const date = new Date().valueOf() 
const cuttoff_date = 0
if (localStorage.getItem('date-created')) {
    // @ts-ignore
    if (localStorage.getItem('date-created') < cuttoff_date) {
        localStorage.removeItem('progress')
        localStorage.removeItem('quarters')
        localStorage.removeItem('date-created')
    }
}

let storage = {};
if (!localStorage.getItem('progress') || localStorage.getItem('progress') === '{}') {
    let progressList : progressionList = {}

    for (let f in missions) { 

        progressList[f] = {}
        for (let m in missions[f]) {

            progressList[f][m] = 0
        }
    }

    localStorage.setItem('progress', JSON.stringify(progressList))
    localStorage.setItem('date-created', date.toString())
    storage = progressList
} else {
    storage = JSON.parse(localStorage.getItem('progress') ?? '')
}

let quarters = {}
if (!localStorage.getItem('quarters') || localStorage.getItem('quarters') === '{}') {
    let progressList : quarterList = {
        "overall": 1
    }

    for (let u in techTreeData) {
        progressList[u] = 0
    }

    localStorage.setItem('quarters',JSON.stringify(progressList))
    quarters = progressList
} else {
    quarters = JSON.parse(localStorage.getItem('quarters') ?? '')
}

export const factionProgress = reactive({
    list: storage as progressionList,
    get() : progressionList {
        return this.list
    },
    toggle(faction: string, name: string) {
        const mission = this.list[faction][name]
        const length = missions[faction][name].length
        if (mission >= length) {
            this.incomplete(faction, name)
        } else {
            this.complete(faction, name)
        }
    },
    complete(faction: string, name: string) : void {
        // Fully completes a mission
        const length = missions[faction][name].length
        this.list[faction][name] = length
        localStorage.setItem('progress', JSON.stringify(this.list))
    },
    
    incomplete(faction: string, name: string) : void {
        // Sets progress in a mission back to 0
        this.list[faction][name] = 0
        localStorage.setItem('progress', JSON.stringify(this.list))
    },

    setPart(faction : string, name : string, part: number) : void {
        // sets the part of a specific mission to that number
        const length = missions[faction][name].length

        if (!length) return
        // if the part number is (greater than) the maximum, set it to maximum
        if (part >= length) {
            this.list[faction][name]= length
            localStorage.setItem('progress', JSON.stringify(this.list))
        } else if (part >= 0) {
            // else if it is a less then the maximum but above zero, set it to that part
            this.list[faction][name]= part
            localStorage.setItem('progress', JSON.stringify(this.list))
        }
    },


})


export const quarterProgress = reactive({
    list: quarters as quarterList,
    get() {
        return this.list
    },
    setPart(upgrade : string, part : number, type : 'level' | 'upgrade' ) : void {
        if (type=='level') {
            this.list['overall'] = part
        } else {
            this.list[upgrade] = part
        }

        localStorage.setItem('quarters', JSON.stringify(this.list))
    }
})


