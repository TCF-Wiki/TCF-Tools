import { reactive } from 'vue'
import { missionListData, techTreeData } from './data'
type progressionList = {
    [key: string]: number
        // which part the user is on
}

type quarterList = {
    [key: string]:  number
    // which part the user is on
}


// Handle if a new season has started.
const date = new Date().valueOf() 
const cuttoff_date = 16880328000000000000000000000000000
if (localStorage.getItem('date-created')) {
    // @ts-ignore
    if (localStorage.getItem('date-created') < cuttoff_date) {
        localStorage.removeItem('progress')
        localStorage.removeItem('quarters')
        localStorage.removeItem('date-created')
    }
    // if old format
    if (localStorage.getItem('progress')) {
        let storage = JSON.parse(localStorage.getItem('progress') ?? '')
        if (storage && storage['ica'] && storage['kor'] && storage['osi']) {
            localStorage.removeItem('progress')
            localStorage.removeItem('date-created')
        }
    }
}

let storage = {};
if (!localStorage.getItem('progress') || localStorage.getItem('progress') === '{}') {
    let progressList : progressionList = {}

    for (let m in missionListData) { 
        progressList[m] = 0
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

// @ts-ignore my bad, as this was forgotten and made after release. This means that people who have used the tracker before dont have this yet. This fixes this.
if (!quarters['increase_bag_6']) quarters['increase_bag_6'] = 0
export const factionProgress = reactive({
    list: storage as progressionList,
    get() : progressionList {
        return this.list
    },
    toggle(name: string) {
        const mission = this.list[name]
        const length = missionListData[name]['missions'].length
        if (mission >= length) {
            this.incomplete( name)
        } else {
            this.complete(name)
        }
    },
    complete(name: string) : void {
        // Fully completes a mission
        const length = missionListData[name]['missions'].length
        this.list[name] = length
        localStorage.setItem('progress', JSON.stringify(this.list))
    },
    
    incomplete(name: string) : void {
        // Sets progress in a mission back to 0
        this.list[name] = 0
        localStorage.setItem('progress', JSON.stringify(this.list))
    },

    setPart(name : string, part: number) : void {
        // sets the part of a specific mission to that number
        const length = missionListData[name]['missions'].length

        if (!length) return
        // if the part number is (greater than) the maximum, set it to maximum
        if (part >= length) {
            this.list[name] = length
            localStorage.setItem('progress', JSON.stringify(this.list))
        } else if (part >= 0) {
            // else if it is a less then the maximum but above zero, set it to that part
            this.list[name] = part
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


