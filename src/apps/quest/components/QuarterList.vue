<template>

<section class="quarter-line__selector">
    <div @click="currentSlide(1)" :class="{'active-slide': slideIndex === 1 }" class="quarter-line__selector-tab">
        <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image"> 
        <span> Quarter Level </span>
        <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image"> 
    </div>

    <div @click="currentSlide(2)" :class="{'active-slide': slideIndex === 2 }" class="quarter-line__selector-tab">
        <img src="/quest-images/Quarters/Generators.png" class="modal__header-image"> 
        <span> Generators </span>
        <img src="/quest-images/Quarters/Generators.png" class="modal__header-image"> 
    </div>

    <div @click="currentSlide(3)" :class="{'active-slide': slideIndex === 3 }" class="quarter-line__selector-tab">
        <img src="/quest-images/Quarters/Inventory.png" class="modal__header-image"> 
        <span> Inventory </span>
        <img src="/quest-images/Quarters/Inventory.png" class="modal__header-image"> 
    </div>

    <div @click="currentSlide(4)" :class="{'active-slide': slideIndex === 4 }" class="quarter-line__selector-tab">
        <img src="/quest-images/Quarters/Workbench.png" class="modal__header-image"> 
        <span> Gear Printer </span>
        <img src="/quest-images/Quarters/Workbench.png" class="modal__header-image"> 
    </div>
</section>

<section class="quarter-list__container">
    <!-- Quarter Level -->
    <div class="quarter-list__container-inner fade">       
        <div class="quarter-line"> 
            <div class="quarter-list-overall">


                <div>
                    <QuarterLevelCard  
                        level="2" 
                    />
                </div>


                <div>
                    <QuarterLevelCard  
                        level="3" 
                    />
                </div>



                <div>
                    <QuarterLevelCard  
                        level="4" 
                    />
                </div>

                <div>
                    <QuarterLevelCard  
                        level="5" 
                    />
                </div>

                <div>
                    <QuarterLevelCard  
                        level="6" 
                    />
                </div>

                <div>
                    <QuarterLevelCard  
                        level="7" 
                    />
                </div>

                <div>
                    <QuarterLevelCard  
                        level="8" 
                    />
                </div>

                <div>
                    <QuarterLevelCard  
                        level="9" 
                    />
                </div>


                <div>
                    <QuarterLevelCard  
                        level="10" 
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Generator -->
    <div class="quarter-list__container-inner fade">       
        <div class="quarter-line"> 
            <div class="quarter-list">
                <div class="quarter-list__number">
                    1
                </div>

                <div class="quarter-list__left">
                    <QuarterTechCard
                        upgrade="generate_kmarks_1"
                    />
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="kmarks_passive_cap_1"
                    />
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="generate_aurum_1"
                    />
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="aurum_passive_cap_1"
                    />
                </div>

                <div class="quarter-list__right">
                    <QuarterTechCard
                        upgrade="daily_crate_1"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    2
                </div>

                <div class="quarter-list__left">
                    <QuarterTechCard
                        upgrade="generate_kmarks_2"
                    />
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="kmarks_passive_cap_2"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    3
                </div>

                <div class="quarter-list__right">
                    <QuarterTechCard
                        upgrade="daily_crate_2"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    4
                </div>
                
                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="generate_aurum_2"
                    />
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="aurum_passive_cap_2"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    5
                </div>

                <div class="quarter-list__left">
                    <QuarterTechCard
                        upgrade="generate_kmarks_3"
                    />
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="kmarks_passive_cap_3"
                    />
                </div>

                <div class="quarter-list__right">
                    <QuarterTechCard
                        upgrade="daily_crate_3"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    6
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="kmarks_passive_cap_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    7
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="generate_aurum_3"
                    />
                </div>
                
                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="aurum_passive_cap_3"
                    />
                </div>

                <div class="quarter-list__right">
                    <QuarterTechCard
                        upgrade="daily_crate_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    8
                </div>

                <div class="quarter-list__left">
                    <QuarterTechCard
                        upgrade="generate_kmarks_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    9
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    10
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="generate_aurum_4"
                    />
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="aurum_passive_cap_4"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Inventory -->
    <div class="quarter-list__container-inner fade">       
        <div class="quarter-line"> 
            <div class="quarter-list">
                <div class="quarter-list__number">
                    1
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="increase_stash_1"
                    />
                </div>


                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_1"
                    />
                </div>

            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    2
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="increase_stash_2"
                    />
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_2"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    3
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="increase_stash_3"
                    />
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_3"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    4
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    5
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    6
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="increase_stash_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    7
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_5"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    8
                </div>

            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    9
                </div>

                <div class="quarter-list__center-left">
                    <QuarterTechCard
                        upgrade="increase_stash_5"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    10
                </div>

                <div class="quarter-list__center-right">
                    <QuarterTechCard
                        upgrade="increase_bag_6"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Gear Printer -->
    <div class="quarter-list__container-inner fade">       
        <div class="quarter-line"> 
            <div class="quarter-list">
                <div class="quarter-list__number">
                    1
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="reduce_pq_upgrading_time_1"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    2
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    3
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    4
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="reduce_pq_upgrading_time_2"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    5
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    6
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="reduce_pq_upgrading_time_3"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    7
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    8
                </div>

            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    9
                </div>

                <div class="quarter-list__center">
                    <QuarterTechCard
                        upgrade="reduce_pq_upgrading_time_4"
                    />
                </div>
            </div>

            <div class="quarter-list">
                <div class="quarter-list__number">
                    10
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { quarterProgress } from '../trackProgress';
import QuarterLevelCard from './QuarterLevelCard.vue'
import QuarterTechCard from './QuarterTechCard.vue';
export default defineComponent({
    components: { QuarterLevelCard, QuarterTechCard },
    data() {
        return {
            slideIndex: 1,
            list: quarterProgress
        }
    },
    methods: {
        plusSlides(n: number) {
            this.showSlides(this.slideIndex +=n)
        },
        
        currentSlide(n: number) {
            this.showSlides(this.slideIndex = n)
        },

        showSlides(n: number) {
            let i;
            let slides = document.getElementsByClassName("quarter-list__container-inner") as any;
            if (n > slides.length) {
                this.slideIndex = 1
            }    
            if (n < 1) {
                this.slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }

            slides[this.slideIndex-1].style.display = "block";  
        },
    },
    mounted() {
        this.showSlides(this.slideIndex)
    }
})
</script>

<style scoped>
.quarter-list__container {
    max-height: 100vh;
    overflow-y: scroll;
}
.quarter-line__container-inner {
    display: none;
}


.quarter-list {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 3fr 3fr 3fr;
    gap: 4rem;
    height: 50%;
    min-height: 13rem;

    margin-top: 1rem;
}

@media screen and (max-width: 900px) {
    .quarter-list {
        gap: 1rem
    }
}

.quarter-list-overall {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    --vertical-gap: 2rem;
    --horizontal-gap: 2rem;
    gap: var(--horizontal-gap) var(--vertical-gap);
    width: 50%;

    margin: auto;
}

.quarter-list__number {
    grid-column: 1  /1;
    text-align: center;
    font-size: 2rem;
}

.quarter-list__left {
    grid-column: 2 / 2;
    position: relative;
}

.quarter-list__center-left {
    grid-column: 3 / 3;
    position: relative;
}
.quarter-list__center {
    grid-column: 4 / 4;
    position: relative;
}

.quarter-list__center-right {
    grid-column: 5 / 6;
    position: relative;
}

.quarter-list__right {
    grid-column: 6 / 6;
}

.quarter-list__left-line {
    grid-column: 2 / 2;
    position: relative;
}

.quarter-list__right-line {
    grid-column: 4 /4 ;
    position: relative;
}

.quarter-list__center svg {
    width: 15%;
    display: flex;
    margin: auto;
}


.fade {
    animation-name: fade-in;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.23, 1, 0.320, 1)	;
}

@keyframes fade-in {
    from {
        opacity: 0;
        translate: 0 30%;
        
    } 
    to {
        opacity: 1;
        translate: 0 0;
    }
}

.quarter-line__selector {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    text-align: center;

    margin: 0 0 var(--space-md);


    cursor: pointer;
    border-collapse: collapse;
}

.quarter-line__selector div {
    text-transform: uppercase;
    letter-spacing: .4rem;

    padding: var(--space-sm);

    position: relative;
    border-collapse: collapse;
    border: 1px solid var(--border-color-base)
}

@media screen and (max-width: 900px) {
    .quarter-line__selector {
        grid-template-columns: 1fr 1fr;
    }
}
.quarter-line__selector-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
}

.quarter-line__selector-tab span {
    text-align: center;
}
.quarter-line__selector-tab img {
    width: var(--space-xl);
}

@media screen and (max-width: 900px) {
    .quarter-line__selector-tab img {
        display: none;
    }
}

.quarter-line__selector div:not(.active-slide)::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid transparent;

    transition: .4s ease-in-out;
}

.quarter-line__selector div:hover:not(.active-slide)::before {
    border-bottom-color: var(--color-base--subtle);
    color: var(--color-base--subtle);
}
.active-slide::before:hover {
    border-bottom-color: var(--color-base--subtle) !important;
}

.active-slide::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid var(--color-base--subtle);

    transition: .4s ease-in-out;
}
</style>