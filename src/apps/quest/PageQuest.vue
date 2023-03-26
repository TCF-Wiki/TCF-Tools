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
                <img src="/map-images/item-images/bad_Reputation.png" class="modal__header-image" />
                <span> Badum </span>
                <img src="/map-images/item-images/bad_Reputation.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(5)" :class="{'active-slide': slideIndex === 5}" class="quest-line__selector-tab">
                <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image" />
                <span> Quarters </span>
                <img src="/quest-images/Quarters/QuarterLevel.png" class="modal__header-image" />
            </div>

            <div @click="currentSlide(6)" :class="{'active-slide': slideIndex === 6}" class="quest-line__selector-tab">
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
                        <QuestCard name="Audiophiles Beware"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Your Civic Duty', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Your Civic Duty')">
                        <QuestCard name="Your Civic Duty"  footer="Part 5 unlocks Crescent Falls" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Doing the Work')">
                        <QuestCard name="Doing the Work"  />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Doing the Work', 6)">
                        <div class="quest-list__right-line-content">Part 6</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="Toxic Love"  unlock="Gas Grenade" />
                    </div>
                </div>

                <div class="quest-list">
                    <!-- <div class="quest-list__left">
                        <QuestCard name="Race to the Bottom"  />
                    </div> 

                    <div class="quest-list__left-line" :class="lineColor('Project Fireball', 7)">
                        <div class="quest-list__left-line-content">Part 7</div>
                    </div> -->

                    <div class="quest-list__center" :class="lineColor('Project Fireball')">
                        <QuestCard name="Project Fireball"  footer="Part 7 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Project Fireball', 5)">
                        <div class="quest-list__right-line-content">Part 5</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="Working for the Community"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Private Business"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Never Give Up', 3)">
                        <div class="quest-list__left-line-content">Part 3</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Never Give Up')">
                        <QuestCard name="Never Give Up"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Back to Basics')">
                        <QuestCard name="Back to Basics"  unlock="Oil Pump Beacon" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Back to Basics', 4)">
                        <div class="quest-list__right-line-content">Part 4</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="The Community Needs You"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('An Eye for Oil')">
                        <QuestCard name="An Eye for Oil"  unlock="Oil Scanning Module" />
                    </div>
                </div>

                <div class="quest-list" :class="lineColor('Put to the Test')">
                    <div class="quest-list__center">
                        <QuestCard name="Put to the Test"  />
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
                    <div class="quest-list__center" :class="lineColor('Time to Punch In')">
                        <QuestCard name="Time to Punch In"  footer="Part 5 unlocks Crescent Falls" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Time to Punch In', 5)">
                        <div class="quest-list__right-line-content">Part 5</div>
                    </div>
                    <div class="quest-list__right">
                        <QuestCard name="What a Tool!"  unlock="Heavy Mining Tool" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Veltecite for the Masses"  unlock="Veltecite Scanning Module" />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Good, Honest Work', 1)">
                        <div class="quest-list__left-line-content">Part 1</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Good, Honest Work')">
                        <QuestCard name="Good, Honest Work"  />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Good, Honest Work', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Titan Hunter"  unlock="Titan Ore Scanning Module" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Focused on Crystals"  unlock="Focus Crystal Scanning Module" />
                    </div>

                    <div class="quest-list__left-line-diagonal" :class="lineColor('Good, Honest Work', 7)">
                        <div class="quest-list__left-line-diagonal-content">Part 7</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('A Powerful Discovery')">
                        <QuestCard name="A Powerful Discovery"  />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('Good, Honest Work', 5)">
                        <div class="quest-list__right-line-diagonal-content">Part 5</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Uncharted Territory"  />
                    </div>
                </div>

                <div class="quest-list">
                    <!-- <div class="quest-list__left">
                        <QuestCard name="In a Deep Dark Hole"  />
                    </div> 

                    <div class="quest-list__left-line" :class="lineColor('Research Costs', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div> -->

                    <div class="quest-list__center" :class="lineColor('Research Costs')">
                        <QuestCard name="Research Costs"  footer="Part 5 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('A Powerful Discovery', 2)">
                        <div class="quest-list__right-line-diagonal-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Time for More Work"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="Crush Hazard"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Heavy Construction', 6)">
                        <div class="quest-list__left-line-content">Part 6</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Heavy Construction')">
                        <QuestCard name="Heavy Construction"  unlock="Laser Drill Beacon" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('Research Costs', 3)">
                        <div class="quest-list__right-line-diagonal-content">Part 3</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Crafting Better Bags"  unlock="Heavy-Duty Backpack" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('The Test Run')">
                        <QuestCard name="The Test Run"  />
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
                    <div class="quest-list__center" :class="lineColor('Dangerous Science')">
                        <QuestCard name="Dangerous Science"  footer="Part 5 unlocks Crescent Falls" />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Dangerous Science', 5)">
                        <div class="quest-list__right-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Howling Skies" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="A Whole New Ecosystem"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Field Research', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Field Research')">
                        <QuestCard name="Field Research"  />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Field Research', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Stimulating Developments"  unlock="Strong_Stim" />
                    </div>
                </div>

                <div class="quest-list">
                    <!-- <div class="quest-list__left">
                        <QuestCard name="The Progenitor Device"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Lost Knowledge', 5)">
                        <div class="quest-list__left-line-content">Part 5</div>
                    </div> -->

                    <div class="quest-list__center" :class="lineColor('Lost Knowledge')">
                        <QuestCard name="Lost Knowledge"  footer="Part 5 unlocks Tharis Island" />
                    </div>

                    <div class="quest-list__right-line-diagonal" :class="lineColor('Field Research', 10)">
                        <div class="quest-list__right-line-diagonal-content">Part 10</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Storm Rider"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__left">
                        <QuestCard name="The Needs of the One"  />
                    </div>

                    <div class="quest-list__left-line" :class="lineColor('Explosive Delivery', 2)">
                        <div class="quest-list__left-line-content">Part 2</div>
                    </div>

                    <div class="quest-list__center" :class="lineColor('Explosive Delivery')">
                        <QuestCard name="Explosive Delivery"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Laser Show')">
                        <QuestCard name="Laser Show"  />
                    </div>
                    <div class="quest-list__right-line" :class="lineColor('Laser Show', 2)">
                        <div class="quest-list__right-line-content">Part 2</div>
                    </div>
                    <div class="quest-list__right" :class="lineColor('Path to Strong Medkits')">
                        <QuestCard name="Path to Strong Medkits"  unlock="Strong Medkit" />
                    </div>
                </div>
                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Everything is Crystals')">
                        <QuestCard name="Everything is Crystals"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Building a better Death Ray')">
                        <QuestCard name="Building a better Death Ray"  />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Satellite Master')">
                        <QuestCard name="Satellite Master"  />
                    </div>

                    <div class="quest-list__right-line" :class="lineColor('Satellite Master', 3)">
                        <div class="quest-list__right-line-content">Part 3</div>
                    </div>

                    <div class="quest-list__right">
                        <QuestCard name="Combat Ready"  unlock="Combat Stim" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Orbital Repairs')">
                        <QuestCard name="Orbital Repairs"  unlock="Orbital Cannon Beacon" />
                    </div>
                </div>

                <div class="quest-list">
                    <div class="quest-list__center" :class="lineColor('Breaking and Entering')">
                        <QuestCard name="Breaking and Entering"  />
                    </div>
                </div>
            </div>
        </div>

        <div class="quest-line__container-inner fade">
            <div class="quest-line">
                <div class="quest-list">
                    <div class="quest-list__center">
                        <QuestStart />
                    </div>
                </div>


                <div class="quest-list">
                    <div class="quest-list__center">
                        <QuestCard name="Fortuna's Favored"  />
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
import {defineComponent} from "vue";
import QuestCard from "./components/QuestCard.vue";
import QuestStart from "./components/QuestStart.vue";
import ItemList from "./components/ItemList.vue";
import QuarterList from "./components/QuarterList.vue";
import {missionListData} from "./data";
import {factionProgress} from "./trackProgress";
import { getFactionOfMission } from "./utils";
import {doneLoading} from "../../all";

export default defineComponent({
    components: {QuestCard, QuestStart, ItemList, QuarterList},
    data() {
        return {
            slideIndex: 2,
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
            let slides = document.getElementsByClassName("quest-line__container-inner") as any;
            if (n > slides.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slides[this.slideIndex - 1].style.display = "block";
        },
        lineColor(name: string, part?: number) {
            const faction = getFactionOfMission(name);
            const progress = this.list.get()[name];
            const length = missionListData[name]['missions'].length;
            if (part) {
                if (progress >= part) return "reached";
            } else {
                if (progress >= length) return "reached";
            }
        },
    },
    mounted() {
        this.showSlides(this.slideIndex);
        //done loading
        doneLoading();
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
    margin-bottom: var(--space-xl);
}
.quest-line .quest-list:nth-child(2) {
    margin-top: var(--space-sm);
}
.quest-line__container-inner {
    display: none;
}

.quest-list {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr 1fr 3fr;
    gap: 0.3rem;
    height: 100%;
    margin: var(--space-xl) var(--space-xl);
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
    content: "";
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
    content: "";
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
    content: "";
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
    content: "";
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
    content: "";
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
    grid-template-columns: 1fr 1fr 1fr;

    text-align: center;

    margin: 0 var(--space-xl) var(--space-md);

    cursor: pointer;
    border-collapse: collapse;
}

.quest-line__selector div {
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    padding: var(--space-sm);

    position: relative;
    border-collapse: collapse;
    border: 1px solid var(--border-color-base);
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
    gap: var(--space-md);
}

.quest-line__selector-tab span {
    text-align: center;
}
.quest-line__selector-tab img {
    width: var(--space-xl);
}

@media screen and (max-width: 900px) {
    .quest-line__selector-tab img {
        display: none;
    }
}

.quest-line__selector div:not(.active-slide)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;

    transition: 0.4s ease-in-out;
}

.quest-line__selector div:hover:not(.active-slide)::before {
    border-color: var(--link-body-color);
    color: var(--color-success);
}
.active-slide::before:hover {
    border-bottom-color: var(--color-primary) !important;
}

.active-slide::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-base--subtle);

    transition: 0.4s ease-in-out;
}

.active-slide:hover::before {
    border-color: var(--color-base--subtle);
}

.back-to-top-text {
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    background-color: var(--color-surface-3);
    padding: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.3rem;

    border-radius: 0.3rem;
}

a.back-to-top {
    transition: 0.2s ease-in-out;
}

a.back-to-top:hover {
    color: var(--color-link);
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
