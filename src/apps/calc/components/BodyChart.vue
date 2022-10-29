<template>
    <button class="" type="button" @click.prevent="isModalOpen = true"> 
        <img src="/calc-images/Body_Chart.png">
    </button>

    <Teleport to="#modal">
        <Transition name="modal"> 
            <div class="modal__bg" v-if="isModalOpen">
                <section class="modal__content" ref="modal">  
                    <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button">x</button>
                    <h2> Body Chart </h2>
                    <p> Damage per bullet </p>
                    <div id="figure">
                        <span id="head">{{head}}</span>
                        <span id="chest">{{chest}}</span>
                        <span id="hip">{{hip}}</span>
                        <span id="legs">{{legs}}</span>
                        <span id="comment"> Spuddy &#8628; </span> 
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
import  { defineComponent } from 'vue';
import { calculate } from '../calculate';
import { roundToThree } from '../utils';
import { selectedAttachments, selectedArmor } from '../store'
export default defineComponent({
    props: ["weapon"],
    data() {
        return {
            showModal: false,
            head: 0,
            chest: 0,
            hip: 0,
            legs: 0,
            selectedAttachments,
            selectedArmor

        }
    },
    mounted() {
        this.updateChart()
    },
    methods: {
        updateChart() {
            this.head = roundToThree( ( (calculate.s(this.weapon, 'directDamage') + calculate.s(this.weapon, 'radialDamage') ) * calculate.penetrationMultiplier(this.weapon) * calculate.s(this.weapon, 'amountOfImmediateFires') ) * calculate.s(this.weapon, 'weakDamageMultiplier') )
            this.chest = roundToThree(  ( (calculate.s(this.weapon, 'directDamage') + calculate.s(this.weapon, 'radialDamage') ) * calculate.penetrationMultiplier(this.weapon) * calculate.s(this.weapon, 'amountOfImmediateFires') ) * 1.0 )
            this.hip = roundToThree(  ( (calculate.s(this.weapon, 'directDamage') + calculate.s(this.weapon, 'radialDamage') ) * calculate.penetrationMultiplier(this.weapon) * calculate.s(this.weapon, 'amountOfImmediateFires') ) * 1.1 )
            this.legs = roundToThree( ( (calculate.s(this.weapon, 'directDamage') + calculate.s(this.weapon, 'radialDamage') ) * calculate.penetrationMultiplier(this.weapon) * calculate.s(this.weapon, 'amountOfImmediateFires') ) * 0.8 )
        }
    },
    watch: {
        selectedAttachments: {
            deep: true,
            handler() {
                this.updateChart()
            }
        },
        selectedArmor : {
            deep: true,
            handler() {
                this.updateChart()
            }
        },

    }

})
</script>

<style scoped>
#figure {
    background-image: url('/calc-images/figure.webp');
    background-size: cover;
    width: 12em;
    height: 30em;
    transform-origin: 0 0;
    position: relative;
    background-repeat: no-repeat;
    user-select: none;
    margin: auto;
    margin-top: 2em;
}

#head::before {
    content: 'Head: '
}
#head {
    position: absolute;
    right: -50%;
    top: 7%
}

#chest::before {
    content: 'Chest: '
}
#chest {
    position: absolute;
    right: -50%;
    top: 25%;
}

#hip::before {
    content: 'Hips: '
}
#hip {
    position: absolute;
    right: -50%;
    top: 46.7%
}

#legs::before {
    content: 'Legs: '
}
#legs {
    position: absolute;
    right: -50%;
    top: 69.9%
}

#comment {
    position: absolute;
    left: -10%;
}

.button {
    margin: 2rem 0 1rem;
    font-size: smaller;
    padding: .4rem;
    width: 100%;
}

.selection-list {
    width: 40rem;
}

span {
    font-size: larger;
    text-transform: uppercase;
}

button img {
    filter: invert(1);
}

h2 {
    text-align: center;
}

p {
    text-align: center;
}
</style>