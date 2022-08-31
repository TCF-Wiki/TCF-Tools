<template>
    <button class="button" type="button" @click.prevent="showModal = true"> Select Attachments </button>
    <p> Stats modified by <br> an attachment will<br>  be <span style="text-decoration: underline"> underlined </span> </p> 
    <section class="selection-list" v-show="showModal">
        <button class="close" @click.prevent="showModal = false"> &times; </button>
        <h2> Attachment Selector </h2>
        <div class="attachment-container">
            <div v-for="(group, key) in groupAttachments(weapon)" class="attachment-selector">
                <!-- <img :src=" 'images/' + armorImage(key) + '.png'  " class="attachment-image" >  -->
                <!-- <span> {{  attachmentData[attachment]['IGN'] }} ({{attachmentData[attachment]['rarity']}})</span>  -->
                <h3> {{ keyNames[key] }} </h3>
                <p v-for="(attachment) in group" 
                :class="{active: colourClassGiver(attachment)}"
                @click="selectedAttachments.toggleSelected(weapon, attachment, key)">
                     {{  attachmentData[attachment]['IGN'] }} ({{attachmentData[attachment]['rarity']}})
                </p>

                
            </div>
        </div>
    </section>
    <div class="background" v-show="showModal" @click.prevent="showModal = false"> </div>
</template>

<script>
import { attachmentData } from '../data'
import { attachment } from '../attachment'
import { selectedAttachments } from '../store'
import { keyObject } from '../utils'
export default {
    name: "AttachmentSelector",
    props: ["weapon"],
    data() {
        return {
            attachmentData: attachmentData,
            showModal: false,
            selectedAttachments,
            keyNames: keyObject
        }
    },
    methods: {
        groupAttachments(weapon) {
            return attachment.groupAttachments(weapon)
        },
        colourClassGiver(attachment) {
            if (selectedAttachments.list[this.weapon]) {
                return (selectedAttachments.list[this.weapon].includes(attachment))
            }
            return false
        },
    }
}

</script>

<style scoped>

.button {
    margin: 2rem 0 1rem;
    font-size: smaller;
    padding: .4rem
}
.attachment-image {
    width: 12em;
    margin: auto;
}


p, span {
    color: var(--text-color-body-white)
}

.active {
    color: var(--text-color-body-gray)
}
.attachment-container {
    display: grid;
    grid-template-columns: 1fr 1fr
}

.attachment-selector {
    margin: .2em;
    border: 2px solid var(--tertairy);
    padding: .5em;
    text-align: left;
}

.attachment-selector p {
    line-height: 1.5em;
    border-bottom: 1px solid var(--primary-accent);
}

.attachment-selector:hover .weapon-image {
    transform: scale(1.05);
}




</style>