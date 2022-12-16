<template>
    <div class="quest-line__container">
        <div class="quest-line__selector">
            <div @click="currentSlide(1)" :class="{'active-slide': slideIndex === 1}" class="quest-line__selector-tab">
                <img src="/map-images/item-images/ica_Reputation.png" class="modal__header-image" />
                <span> ICA </span>
                <img src="/map-images/item-images/ica_Reputation.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(2)" :class="{'active-slide': slideIndex === 2}" class="quest-line__selector-tab">
                <img src="/map-images/item-images/kor_Reputation.png" class="modal__header-image" />
                <span> Korolev </span>
                <img src="/map-images/item-images/kor_Reputation.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(3)" :class="{'active-slide': slideIndex === 3}" class="quest-line__selector-tab">
                <img src="/map-images/item-images/osi_Reputation.png" class="modal__header-image" />
                <span> Osiris </span>
                <img src="/map-images/item-images/osi_Reputation.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(4)" :class="{'active-slide': slideIndex === 4}" class="quest-line__selector-tab">
                <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image" />
                <span> Quarters </span>
                <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(5)" :class="{'active-slide': slideIndex === 5}" class="quest-line__selector-tab">
                <img src="/quest-images/Quarters/ItemList.png" class="modal__header-image" />
                <span> Items </span>
                <img src="/quest-images/Quarters/ItemList.png" class="modal__header-image" />
            </div>
        </div>

        <!-- ICA -->
        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center">
                        <QuestStart />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Audiophiles Beware" faction="ica" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('ica', 'Your Civic Duty', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('ica', 'Your Civic Duty')">
                        <QuestCard name="Your Civic Duty" faction="ica" footer="Part 5 unlocks Crescent Falls" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('ica', 'Doing the Work')">
                        <QuestCard name="Doing the Work" faction="ica" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('ica', 'Doing the Work', 6)">
                        <div class="quest-list__right-line-content">Part 6</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="Toxic Love" faction="ica" unlock="Gas Grenade" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Race to the Bottom" faction="ica" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('ica', 'Project Fireball', 7)">
                        <div class="quest-list__left-line-content">Part 7</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('ica', 'Project Fireball')">
                        <QuestCard name="Project Fireball" faction="ica" footer="Part 7 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('ica', 'Project Fireball', 5)">
                        <div class="quest-list__right-line-content">Part 5</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="Working for the Community" faction="ica" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Private Business" faction="ica" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('ica', 'Never Give Up', 3)">
                        <div class="quest-list__left-line-content">Part 3</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('ica', 'Never Give Up')">
                        <QuestCard name="Never Give Up" faction="ica" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('ica', 'Back to Basics')">
                        <QuestCard name="Back to Basics" faction="ica" unlock="Oil Pump Beacon" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('ica', 'Back to Basics', 4)">
                        <div class="quest-list__right-line-content">Part 4</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="The Community Needs You" faction="ica" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('ica', 'An Eye for Oil')">
                        <QuestCard name="An Eye for Oil" faction="ica" unlock="Oil Scanning Module" />
                    </div>
                </div>

                <div class="quest-list" :class="lineColor('ica', 'Put to the Test')">
                    <div class="quest-list__center">
                        <QuestCard name="Put to the Test" faction="ica" />
                    </div>
                </div>
            </div>
        </div>

        <!-- KOROLEV -->
        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center">
                        <QuestStart />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('kor', 'Time to Punch In')">
                        <QuestCard name="Time to Punch In" faction="kor" footer="Part 5 unlocks Crescent Falls" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('kor', 'Time to Punch In', 5)">
                        <div class="quest-list__right-line-content">Part 5</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="What a Tool!" faction="kor" unlock="Heavy Mining Tool" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Veltecite for the Masses" faction="kor" unlock="Veltecite Scanning Module" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('kor', 'Good Honest Work', 1)">
                        <div class="quest-list__left-line-content">Part 1</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('kor', 'Good Honest Work')">
                        <QuestCard name="Good Honest Work" faction="kor" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('kor', 'Good Honest Work', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Titan Hunter" faction="kor" unlock="Titan Ore Scanning Module" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Focused on Crystals" faction="kor" unlock="Focus Crystal Scanning Module" />
                    </div>

                    <div class="quest-list__left-line-diagonal" :class="lineColor('kor', 'Good Honest Work', 7)">
                        <div class="quest-list__left-line-diagonal-content">Part 7</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('kor', 'A Powerful Discovery')">
                        <QuestCard name="A Powerful Discovery" faction="kor" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('kor', 'Good Honest Work', 5)">
                        <div class="quest-list__right-line-diagonal-content">Part 5</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Uncharted Territory" faction="kor" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="In a Deep Dark Hole" faction="kor" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('kor', 'Research Costs', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('kor', 'Research Costs')">
                        <QuestCard name="Research Costs" faction="kor" footer="Part 5 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('kor', 'A Powerful Discovery', 2)">
                        <div class="quest-list__right-line-diagonal-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Time for More Work" faction="kor" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Crush Hazard" faction="kor" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('kor', 'Heavy Construction', 6)">
                        <div class="quest-list__left-line-content">Part 6</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('kor', 'Heavy Construction')">
                        <QuestCard name="Heavy Construction" faction="kor" unlock="Laser Drill Beacon" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('kor', 'Research Costs', 3)">
                        <div class="quest-list__right-line-diagonal-content">Part 3</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Crafting Better Bags" faction="kor" unlock="Heavy-Duty Backpack" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('kor', 'The Test Run')">
                        <QuestCard name="The Test Run" faction="kor" />
                    </div>
                </div>
            </div>
        </div>

        <!-- OSIRIS -->
        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center">
                        <QuestStart />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Dangerous Science')">
                        <QuestCard name="Dangerous Science" faction="osi" footer="Part 5 unlocks Crescent Falls" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="A Whole New Ecosystem" faction="osi" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('osi', 'Field Research', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('osi', 'Field Research')">
                        <QuestCard name="Field Research" faction="osi" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('osi', 'Field Research', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Stimulating Developments" faction="osi" unlock="Strong_Stim" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="The Progenitor Device" faction="osi" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('osi', 'Lost Knowledge', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('osi', 'Lost Knowledge')">
                        <QuestCard name="Lost Knowledge" faction="osi" footer="Part 5 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('osi', 'Field Research', 10)">
                        <div class="quest-list__right-line-diagonal-content">Part 10</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Storm Rider" faction="osi" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="The Needs of the One" faction="osi" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('osi', 'Explosive Delivery', 2)">
                        <div class="quest-list__left-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('osi', 'Explosive Delivery')">
                        <QuestCard name="Explosive Delivery" faction="osi" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Laser Show')">
                        <QuestCard name="Laser Show" faction="osi" />
                    </div>
                    <div class="quest-list__right-line" :class="lineColor('osi', 'Laser Show', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>
                    <div class="quest-list__right" :class="lineColor('osi', 'Path to Strong Medkits')">
                        <QuestCard name="Path to Strong Medkits" faction="osi" unlock="Strong Medkit" />
                    </div>
                </div>
                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Everything is Crystals')">
                        <QuestCard name="Everything is Crystals" faction="osi" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Building a better Death Ray')">
                        <QuestCard name="Building a better Death Ray" faction="osi" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Satellite Master')">
                        <QuestCard name="Satellite Master" faction="osi" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('osi', 'Satellite Master', 3)">
                        <div class="quest-list__right-line-content">Part 3</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Combat Ready" faction="osi" unlock="Combat Stim" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Orbital Repairs')">
                        <QuestCard name="Orbital Repairs" faction="osi" unlock="Orbital Cannon Beacon" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('osi', 'Breaking and Entering')">
                        <QuestCard name="Breaking and Entering" faction="osi" />
                    </div>
                </div>
            </div>
        </div>

        <!-- QUARTERS -->
        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center wide">
                        <QuarterList />
                    </div>
                </div>
            </div>
        </div>

        <!-- ITEMS -->
        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center wide">
                        <ItemList />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a class="back-to-top" href="#top"> <div class="back-to-top-text">Back To Top</div></a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import QuestCard from './components/QuestCard.vue';
import QuestStart from './components/QuestStart.vue';
import ItemList from './components/ItemList.vue';
import QuarterList from './components/QuarterList.vue';
import {missions} from './QuestConstants';
import {factionProgress} from './trackProgress';

export default defineComponent({
    components: {QuestCard, QuestStart, ItemList, QuarterList},
    data() {
        return {
            slideIndex: 3,
            list: factionProgress,
        };
    },
    methods: {
        plusSlides(n: number) {
            this.showSlides((this.slideIndex += n));
        },

        currentSlide(n: number) {
            this.showSlides((this.slideIndex = n));
        },

        showSlides(n: number) {
            let i;
            let slides = document.getElementsByClassName('quest-line__container-inner') as any;
            if (n > slides.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            slides[this.slideIndex - 1].style.display = 'block';
        },
        lineColor(faction: string, name: string, part?: number) {
            const progress = this.list.get()[faction][name];
            const length = missions[faction][name].length;

            if (part) {
                if (progress >= part) return 'reached';
            } else {
                if (progress >= length) return 'reached';
            }
        },
    },
    mounted() {
        this.showSlides(this.slideIndex);
    },
});
</script>

<style scoped>
.quest-line__container {
    max-width: 100%;
    position: relative;
    margin: auto;
}

.quest-line .quest-list:first-child {
    margin-bottom: 2rem;
}
.quest-line .quest-list:nth-child(2) {
    margin-top: 0.5rem;
}
.quest-line__container-inner {
    display: none;
}

.quest-list {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr 1fr 3fr;
    gap: 0.3rem;
    height: 100%;
    margin: 2rem 2rem;
}

.quest-list:first-child {
    margin-top: 0;
}

.quest-list * {
    /* --border-color: var(--rarity-color-exotic); */
    --border-width: 6px;
    transition: border-color 2s linear;
}

.quest-list__left-line::before {
    transition: border-color 0.2s linear;
}
.quest-list__left-line::before,
.quest-list__left-line-diagonal::before,
.quest-list__right-line::before,
.quest-list__right-line-diagonal::before,
.quest-list:not(:last-child):not(:nth-child(1)) .quest-list__center::before {
    transition: border-color 0.2s linear;
}

.quest-list:not(:last-child):not(:nth-child(1)) .quest-list__center::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 200%;
    left: 0%;
    border-right: var(--border-width) dotted;
    border-color: var(--rarity-color-exotic);
}

.quest-list__left-line.reached::before,
.quest-list__left-line-diagonal.reached::before,
.quest-list__right-line.reached::before,
.quest-list__right-line-diagonal.reached::before,
.quest-list__center.reached::before,
.quest-list:not(:last-child):not(:nth-child(1)) .quest-list__center.reached::before {
    border-color: var(--rarity-color-uncommon);
}

.quest-list__left-line::before {
    content: '';
    position: absolute;
    width: 140%;
    top: 0%;
    left: -3%;
    height: 53%;

    border-bottom: var(--border-width) dotted;
    border-color: var(--rarity-color-exotic);
}

.quest-list__left-line-content {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 43.7%;
    left: 32%;
}

.quest-list__right-line::before {
    content: '';
    position: absolute;
    width: 140%;
    top: 0%;
    left: -3%;
    height: 53%;

    border-bottom: var(--border-width) dotted;
    border-color: var(--rarity-color-exotic);
}

.quest-list__right-line-content {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 43.7%;
    left: 32%;
}

.quest-list__left-line-diagonal,
.quest-list__right-line-diagonal {
    position: relative;
    z-index: 0;
}
.quest-list__left-line-diagonal::before {
    content: '';
    position: absolute;
    width: 120%;
    top: -14%;
    left: -15%;
    height: 10%;

    rotate: -30deg;
    border-bottom: var(--border-width) dotted;
    border-color: var(--rarity-color-exotic);
}

.quest-list__left-line-diagonal-content {
    position: absolute;
    width: 100%;
    height: 100%;

    rotate: -30deg;

    top: -30%;
    left: 72%;

    pointer-events: none;
}

.quest-list__right-line-diagonal::before {
    content: '';
    position: absolute;
    width: 120%;
    top: -14%;
    right: -15%;
    height: 10%;

    rotate: 30deg;
    border-bottom: var(--border-width) dotted;
    border-color: var(--rarity-color-exotic);

    pointer-events: none;
}

.quest-list__right-line-diagonal-content {
    position: absolute;
    width: 100%;
    height: 10%;

    rotate: 30deg;

    top: -6%;
    right: -30%;
}

.quest-list__left {
    grid-column: 1 /1;
}

.quest-list__center {
    grid-column: 3 / 3;
    position: relative;
}

.quest-list__center.wide {
    grid-column: 1 / 6;
}

.quest-list__right {
    grid-column: 5 / 5;
}

.quest-list__left-line {
    grid-column: 2 / 2;
    position: relative;
}

.quest-list__right-line {
    grid-column: 4 /4;
    position: relative;
}

.quest-list__center svg {
    width: 15%;
    display: flex;
    margin: auto;
}

.fade {
    animation-name: fade-in;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
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

.quest-line__selector {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    text-align: center;

    margin: 0 2rem 1rem;

    cursor: pointer;
    border-collapse: collapse;
}

.quest-line__selector div {
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    padding: 0.5rem;

    position: relative;
    border-collapse: collapse;
    border: 3px solid var(--background-button-color);
}

@media screen and (max-width: 900px) {
    .quest-line__selector {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (max-width: 1500px) {
    .quest-line__selector {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
.quest-line__selector-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
}

.quest-line__selector-tab span {
    text-align: center;
}
.quest-line__selector-tab img {
    width: 2rem;
}

@media screen and (max-width: 900px) {
    .quest-line__selector-tab img {
        display: none;
    }
}

.quest-line__selector div:not(.active-slide)::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid transparent;

    transition: 0.4s ease-in-out;
}

.quest-line__selector div:hover:not(.active-slide)::before {
    border-bottom-color: var(--link-body-color);
    color: red;
}
.active-slide::before:hover {
    border-bottom-color: var(--link-body-color) !important;
}

.active-slide::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid var(--link-body-color);

    transition: 0.4s ease-in-out;
}

.active-slide:hover::before {
    border-bottom-color: var(--button-accent-color);
}

.back-to-top-text {
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    background-color: var(--background-stripe-color);
    padding: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.3rem;

    border-radius: 0.3rem;
}

a.back-to-top {
    transition: 0.2s ease-in-out;
}

a.back-to-top:hover {
    color: var(--link-body-color);
}

@media screen and (max-width: 900px) {
    .quest-line__container {
        width: 100%;
        max-width: 100%;
        overflow-x: scroll;
    }

    .back-to-top {
        width: 200%;
    }

    .quest-list {
        gap: 0.1rem;
        margin: 0.2rem;
    }

    .quest-list * {
        --border-width: 2px;
    }

    .quest-list__left-line-content,
    .quest-list__left-line-diagonal-content,
    .quest-list__right-line-content,
    .quest-list__right-line-diagonal-content {
        font-size: 0.6rem;
    }
}
</style>
