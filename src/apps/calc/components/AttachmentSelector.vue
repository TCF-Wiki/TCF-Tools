<template>
    <button class="" type="button" @click.prevent="isModalOpen = true"><img src="/calc-images/Attachment_Icon.png"> </button>
    <!-- <p> Stats modified by <br> an attachment will<br>  be <span style="text-decoration: underline"> underlined </span> </p>  -->
    <div class="attachment-list"> 
        <p> Selected attachments: </p>
        <p v-for="(key, group) in selectedAttachments.typeList[weapon]" @click="selectedAttachments.toggleSelected(weapon, null, group)"> 
                <font-awesome-icon icon="fas fa-trash" />
                {{ attachmentData[key]['inGameName'] }} 
        </p>
        <p v-if="!selectedAttachments.list[weapon] || selectedAttachments.list[weapon].length==0"> None </p>

    </div>

    <Teleport to="#modal">
        <Transition name="modal"> 
            <div class="modal__bg" v-if="isModalOpen">
                <section class="modal__content modal__small" ref="modal">  
                    <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                    <h2> Attachment Selector </h2>
                    <div class="attachment-container">
                        <div v-for="(key, group) in groupAttachments(weapon)" class="attachment-selector" :key="key">
                            <h3> {{ keyNames[group] }} </h3>
                            <p  
                                @click="selectedAttachments.toggleSelected(weapon, null, group)"
                                :class="colourClassGiver(null, group)"
                                class="attachment-item"
                            > 
                                None 
                            </p>
                            <p v-for="(attachment, key2) in key"  :key="key2"
                                :class="colourClassGiver(attachment, group)"
                                @click="selectedAttachments.toggleSelected(weapon, attachment, group)"
                                class="attachment-item"
                            >
                                {{  attachmentData[attachment]['inGameName'] }} ({{attachmentData[attachment]['rarity']}})
                            </p>
                        </div>
                        <div v-if="getAttachments(weapon).length == 0">
                            <p class="center"> This weapon has no attachments available. </p>
                        </div>
                    </div>
                </section>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
/* @ts-ignore */
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false)
const modal = ref(null)
onClickOutside(modal, () => (isModalOpen.value = false))
    
const openModal = () => {
    isModalOpen.value = true

    const body = document.body
    
    body.style.pointerEvents = 'none'

    setTimeout( () => { body.style.pointerEvents = 'all'},600)
}
</script>

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
            keyNames: keyObject,
        }
    },
    methods: {
        groupAttachments(weapon) {
            return attachment.groupAttachments(weapon)
        },
        getAttachments(weapon) {
            return attachment.getAttachments(weapon)
        },
        colourClassGiver(attachment, category) {
            let output = ''
            if (attachment != null) output += attachmentData[attachment]['rarity'].toLowerCase()

            if (selectedAttachments.typeList[this.weapon]) {
                if (selectedAttachments.typeList[this.weapon][category]) {
                    if (selectedAttachments.typeList[this.weapon][category] == attachment) {
                        output += ' active'
                    }
                } else {
                    if (attachment == null) {
                        return 'active'
                    }
                }
            } else if (attachment == null) {
                return 'active'
            }
            return output
        },
    }
}

</script>

<style scoped>
.active {
    background-color: var(--color-surface-1);
}

.attachment-image {
    width: 12em;
    margin: auto;
}


.attachment-item, span {
    color: var(--color-base);
    transition: all .1s ease-in-out;
}

.attachment-item:not(.active):hover {
    background-color: var(--color-surface-2);
}

.attachment-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-sm);
    margin-top: var(--space-md);
}

@media screen and (max-width: 900px) {
    .attachment-container {
        grid-template-columns: 1fr;
    }
}

.attachment-selector {
    margin: .2em;
    cursor: pointer;
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

.center {
    text-align: center;
    transform: translateX(50%)
}

.attachment-list {
    grid-area: 2 / 1 / 2 / 3;
    width: 100%;
}
button {
    aspect-ratio: 1 /1 ;
}
button img {
    filter: invert(1);    
    width: 100%;
    height: 100%
}

.attachment-list p {
    padding: var(--space-xs) 0
}
.attachment-list p:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color-base);
}
.attachment-list p > svg {
    color: var(--rarity-color-exotic);
    padding-left: 0.2rem;

    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    display: inline-flex;
}
</style>