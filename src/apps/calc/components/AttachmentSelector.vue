<template>
    <img src="/calc-images/Attachment_Icon.png" @click.prevent="isModalOpen = true" role="button"> 
    <Teleport to="#modal">
        <Transition name="modal"> 
            <div class="modal__bg" v-if="isModalOpen">
                <section class="modal__content modal__small" ref="modal">  
                    <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                    <h2> Attachment Selector </h2>

                    <div class="attachment-container">
                        <div v-if="AmmoConverter.length > 0" class="container">
                            <h3> Ammo Converter </h3>
                            <v-select 
                                :options="AmmoConverter"
                                placeholder="Select an attachment"
                                :reduce="AmmoConverter => AmmoConverter.codeName"
                                label="inGameName"
                                v-model="selectedAmmo"
                            />
                        </div>
                        <div v-if="Magazine.length > 0" class="container">
                            <h3> Magazine </h3>
                            <v-select 
                                :options="Magazine"
                                placeholder="Select an attachment"
                                :reduce="AmmoConverter => AmmoConverter.codeName"
                                label="inGameName"
                                v-model="selectedMag"
                            />
                        </div>
                        <div v-if="ForeGrip.length > 0" class="container">
                            <h3> Fore Grip </h3>
                            <v-select 
                                :options="ForeGrip"
                                placeholder="Select an attachment"
                                :reduce="AmmoConverter => AmmoConverter.codeName"
                                label="inGameName"
                                v-model="selectedFore"
                            />
                        </div>
                        <div v-if="RearGrip.length > 0" class="container">
                            <h3> Rear Grip </h3>
                            <v-select 
                                :options="RearGrip"
                                placeholder="Select an attachment"
                                :reduce="AmmoConverter => AmmoConverter.codeName"
                                label="inGameName"
                                v-model="selectedRear"
                            />
                        </div>
                        <div v-if="Stock.length > 0" class="container">
                            <h3> Stock </h3>
                            <v-select 
                                :options="Stock"
                                placeholder="Select an attachment"
                                :reduce="AmmoConverter => AmmoConverter.codeName"
                                label="inGameName"
                                v-model="selectedStock"
                            />
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
            selected: '',
            AmmoConverter: [],
            Magazine: [],
            ForeGrip: [],
            RearGrip: [],
            Stock: [],
            selectedAmmo: '',
            selectedMag: '',
            selectedFore: '',
            selectedRear: '',
            selectedStock: ''        
        }
    },
    methods: {
        groupAttachments(weapon) {
            return attachment.groupAttachments(weapon)
        },
        getAttachments(weapon) {
            return attachment.getAttachments(weapon)
        },
    },
    mounted() {
        let attachments = attachment.groupAttachments(this.weapon)
        for (let cat in attachments) {
            let output = [{inGameName: 'None', codeName: null}]
            for (let attach in attachments[cat]) {
                let cur = attachments[cat][attach]
                output.push({
                    inGameName: attachmentData[cur]['inGameName'] + ' (' + attachmentData[cur]['rarity'] + ')',
                    codeName: cur 
                })
            }
            if (cat == 'AmmoConverter') this.AmmoConverter = output
            if (cat == 'Stock') this.Stock = output
            if (cat == 'ForeGrip') this.ForeGrip = output
            if (cat == 'RearGrip') this.RearGrip = output
            if (cat == 'Magazine') this.Magazine = output
        }
    },
    watch: {
        selectedAmmo : {
            deep: true,
            handler() {
                selectedAttachments.toggleSelected(this.weapon, this.selectedAmmo, 'AmmoConverter')
            }
        },
        selectedMag : {
            deep: true,
            handler() {
                selectedAttachments.toggleSelected(this.weapon, this.selectedMag, 'Magazine')
            }
        },
        selectedFore : {
            deep: true,
            handler() {
                selectedAttachments.toggleSelected(this.weapon, this.selectedFore, 'ForeGrip')
            }
        },
        selectedRear : {
            deep: true,
            handler() {
                selectedAttachments.toggleSelected(this.weapon, this.selectedRear, 'RearGrip')
            }
        },
        selectedStock : {
            deep: true,
            handler() {
                selectedAttachments.toggleSelected(this.weapon, this.selectedStock, 'Stock')
            }
        }
    }
}

</script>

<style scoped>
.modal__content {
    padding: 5rem 5rem 18rem;
}

img {
    width: 24px;
    height: 24px;
    cursor: pointer;
}
</style>