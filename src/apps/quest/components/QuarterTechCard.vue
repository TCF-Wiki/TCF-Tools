<template>
<section class="card" @click="isModalOpen = true">
    <div class="card__image">
        <img class="card__image-img" :src="'quest-images/Quarters/' + imageName + '.png'">
    </div>
    <header class="card__header">
        <span class="card__header-text">
            {{ cardName }}
        </span>
    </header>

    <div class="card__parts">
        {{ progress.get()[upgrade] }} / {{ data[upgrade]['levels'].length }}
    </div>

    
    <div class="card__button" role="button" @click.stop.prevent="handleProgress()">
        <div class="card__button-text">
            <svg  v-if="data[upgrade]['levels'].length == progress.get()[upgrade]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>          

            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
        </div>
    </div>

</section>

<Teleport to="#modal">
    <Transition name="modal"> 
        <div class="modal__bg" v-if="isModalOpen"> 
            <section class="modal__content" ref="modal">  
                <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button">x</button>
                    <TechParts 
                        :upgrade="upgrade" 
                        :name="cardName"
                        :imageName="imageName"
                    />
            </section>
        </div>
    </Transition>
</Teleport>
</template>

<script setup lang="ts">
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

<script lang="ts">
import { defineComponent } from 'vue';
import { techTreeData } from '../data';
import TechParts from './TechParts.vue';
import { quarterProgress } from '../trackProgress';
export default defineComponent({
    props: ['upgrade'],
    components: {
        TechParts
    },
    data() {
        return {
            data: techTreeData,
            isModalOpen: false,
            progress: quarterProgress
        }
    },
    computed: {
        imageName() {
            if (this.upgrade.includes('kmarks')) return 'Generator_SoftCurrency'
            if (this.upgrade.includes('aurum')) return 'Generator_HardCurrency'
            if (this.upgrade.includes('crate')) return 'DailyCrate'
            if (this.upgrade.includes('bag')) return 'SafePocket'
            if (this.upgrade.includes('stash')) return 'Stash'
            if (this.upgrade.includes('reduce_pq_upgrading_time')) return 'Crafting'
        },

        cardName() {
            if (this.upgrade.includes('generate_kmarks')) return 'K-Marks Generator'
            if (this.upgrade.includes('kmarks_passive')) return 'K-Marks Cap'
            if (this.upgrade.includes('generate_aurum')) return 'Aurum Generator'
            if (this.upgrade.includes('aurum_passive')) return 'Aurum Cap'
            if (this.upgrade.includes('crate')) return 'Supply Crate'
            if (this.upgrade.includes('bag')) return 'Safe Pocket Size'
            if (this.upgrade.includes('stash')) return 'Stash Size'
            if (this.upgrade.includes('reduce_pq_upgrading_time')) return 'Upgrade Time'


        },
    },
    methods: {
        handleProgress() {
            if (this.progress.get()[this.upgrade] == this.data[this.upgrade]['levels'].length) {
                this.progress.setPart(this.upgrade, 0, 'upgrade')
            } else {
                this.progress.setPart(this.upgrade, this.data[this.upgrade]['levels'].length, 'upgrade')
            }
        }
    }
})
</script>

<style scoped>
.card {
    aspect-ratio: 1;
    width: 100%;

    position: relative;

    isolation: isolate;

    overflow: hidden;
    border-radius: var(--border-radius);


    background: rgba(0, 0, 0, 0.3);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;

    --padding: 4%;
    --border-radius: .5rem;
    --duration: .3s;
    --timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --delay: .0s;

    transition: all var(--duration) var(--timing) var(--delay);
}

.card__level {
    position: absolute;
    top: var(--padding);
    right: var(--padding);

    font-size: 1.6rem;
}

.card__image {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    overflow: hidden;

    opacity: .4;
    z-index: -2;

    transition: all var(--duration) var(--timing) var(--delay);

    transform: rotate(0);

    border-radius: var(--border-radius);

    display: flex;
    justify-content: center;
    align-items: center;
}

.card__image-img {
    width: 70%;
    height: 70%;

    overflow: hidden;
    background-size: cover;
    transition: all var(--duration) var(--timing) var(--delay);
}

.card:hover .card__image-img{
    transform: scale(1.1) !important;
}


.card__button {
    position: absolute;
    bottom: var(--padding);
    right: calc(var(--padding) / 1.6);
    opacity: 1;

    width: 20%;
    text-align: center;
    /* transition: all var(--duration) var(--timing) var(--delay); */

    display: flex;
    justify-content: end;

    z-index: 4;

    transition: scale var(--duration) var(--timing) var(--delay);
}

.card__button:hover {
    scale: 1.2
}

.card__button-text {
    width: 75%;
    aspect-ratio: 1;
    border-radius: 50%;

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    color: red;
    z-index: 4;
}

.card__button-text svg {
    fill: var(--rarity-color-rare)
}

.card__header {
    position: absolute;
    top: var(--padding);
    left: var(--padding);
}

.card__header-text {
    font-family: sans-serif;
    text-transform: none;
    transition: all var(--duration) var(--timing) var(--delay);
    font-size: 100%;
    text-overflow: ellipsis;
}


.card__parts {
    position: absolute;
    bottom: var(--padding);
    left: var(--padding);
    font-size: 1.5rem;
}

@media screen and (max-width: 900px) {
    .card__parts {
        font-size: 1rem;
    }

    .card__header-text {
        font-size: 0.7rem;
    }
}

</style>