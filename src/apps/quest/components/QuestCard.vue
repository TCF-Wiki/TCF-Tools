<template>
<section ref="card" class="card" @click="openModal()">
    <div class="card__image">
        <img class="card__image-img" :src="'quest-images/MI/' + name.replaceAll(' ','_') + '.png'" v-if="name">
    </div>
    <div class="card__button" role="button" @click.stop.prevent="progressInfo.toggle(faction, name)">
            <div class="card__button-text" :class="faction" >
                <svg  v-if="progressInfo.get()[faction][name] >= missions[faction][name].length" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>          

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
            </div>
    </div>
    <div class="card__contents"> 
        <header class="card__header" v-if="name"> 
            <h3 class="card__header-text"> 
                {{ name }} 
            </h3>
        </header>
        <section class="card__desc" v-if="desc">
            <div class="card__desc-text"> 
                {{ desc }}
            </div>
        </section>
        <div class="card__footer" role="footer" v-if="footer">
            <div class="card__footer-text">
                {{ footer }}
            </div>
        </div>
        <div class="card__unlock" v-if="unlock" :class="faction">
            <img class="card__unlock-image" :src="'/map-images/item-images/' + unlock.replaceAll(' ','_') + '.png'">
        </div>
        <div class="card__parts" v-if="parts"> {{progressInfo.get()[faction][name]}} / {{ missions[faction][name].length }}</div>
    </div>
</section>

<Teleport to="#modal">
    <Transition name="modal"> 
        <div class="modal__bg" v-if="isModalOpen">
            <section class="modal__content" ref="modal">  
                <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button">x</button>
                    <QuestParts 
                        :name="name" 
                        :faction="faction"
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
import  { defineComponent } from 'vue';
import { missionData } from '../data'
import { missions } from '../QuestConstants'
import QuestParts from './QuestParts.vue'
import { factionProgress } from '../trackProgress'
export default defineComponent({
    props: [
        "name",
        "faction",
        "unlock",
        "footer"
    ],
    data() {
        return {
            missions: missions,
            missionData: missionData,
            desc: '' as string,
            parts: '' as string,
            progressInfo: factionProgress
        }
    },
    mounted() {
        const mission = missions[this.faction][this.name] 
        if (mission) {
            this.desc = this.missionData[mission[0]]['chainDescription']
            this.parts = `${this.progressInfo.get()[this.faction][this.name]} / ${mission.length}`
        }
    },
    methods: {
        addShake() {
            // const card = this.$refs.card as HTMLElement
            // card.classList.add('apply-rotate')

            // setTimeout(() => { card.classList.remove('apply-rotate')}, 1000)
        }
    },
})
</script>
<style>

</style>

<style scoped>
.card {
    width: 100%;
    aspect-ratio: 1.6 / 1;
    /* overflow: hidden; */

    position: relative;
    
    isolation: isolate;

    border-radius: var(--border-radius);


    background: black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;

    --padding: 4%;
    --border-radius: .5rem;
    --duration: .3s;
    --timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --delay: .0s;

    transition: all var(--duration) var(--timing) var(--delay);

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

}

.card__image-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    transition: all var(--duration) var(--timing) var(--delay);
}

.card:hover .card__image-img{
    transform: scale(1.1) !important;
}

.card__contents {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: visible;
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

.card:hover .card__header-text {
    letter-spacing: .005rem;
}

.card__header-text::before {
    content: '';
    width: 100%;
    height: 2%;
    bottom: 10%;
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    opacity: .5;

    transition: width var(--duration) var(--timing) var(--delay);
}

.card:hover .card__header-text::before {
    width: 0px;
}

.card__button {
    position: absolute;
    bottom: var(--padding);
    right: calc(var(--padding) / 1.6);
    opacity: 1;

    width: 10%;
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

.card__desc {
    position: absolute;
    width: 80%;
    top: 18%;
    left: var(--padding);
}

.card__desc-text {
    overflow: hidden;

    opacity: .9;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    line-clamp: 2; 
    -webkit-box-orient: vertical;
}



.card__footer {
    position: absolute;
    bottom: var(--padding);
    left: var(--padding);
    opacity: .9;
}
.card__parts {
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    font-size: 1.5rem;
}

.card:hover .card__parts {
    animation: circle var(--duration) var(--timing) var(--delay);
}

@keyframes circle {
    0% {
        rotate: 0deg;
    }

    50% {
        rotate: 0deg;
    }

    100% {
        rotate: 0deg;
    }
}
.card__unlock {
    position: absolute;
    bottom: var(--padding);
    right: calc(3.5 *var(--padding));
    opacity: 1;
    pointer-events: none;
    width: 10%;
    text-align: center;
    transition: all var(--duration) var(--timing) var(--delay);

    display: flex;
    justify-content: end;

    transition: all var(--duration) var(--timing) var(--delay);
    z-index: 0;
}

.card__unlock-image {
    height: 100%;
    width: 100%;
    z-index: 0;
    pointer-events: none;
}

.osi {
    outline-color: #3fa321;
    fill: #3fa321;
}

.ica {
    outline-color: #5ed1f4;
    fill: #5ed1f4;
}

.kor {
    outline-color: #d65c1f;
    fill: #d65c1f;
}


@keyframes rotate {
    10%,
    90% {
        rotate: -1deg;
    }

    20%,
    80% {
        rotate: 2deg;
    }

    30%,
    50%,
    70% {
        rotate: -3deg;
    }

    40%,
    60% {
        rotate: 3deg;

    }
}

.apply-rotate {
    animation: rotate calc(var(--duration) * 1.5) var(--timing) var(--delay);
}

@media screen and (max-width: 900px) {
    .card__header-text {
        font-size: .6rem;
        text-overflow: ellipsis;
    }

    .card__header-text::before {
        display: none;
    }

    .card__desc {
        display: none;
    }

    .card__parts {
        font-size: .8rem;
        left: var(--padding);
        bottom: var(--padding);
        top: unset
    }

    .card__footer {
        display: none;
    }

}

</style>