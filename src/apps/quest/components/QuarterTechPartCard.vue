<template>
    <section class="card">
        <div class="card__image">
            <img class="card__image-img" :src="'quest-images/Quarters/' + image + '.png'" />
        </div>
        <div class="card__level">
            {{ index + 1 }}
        </div>

        <div class="card__costs">
            <div v-for="(amount, item) in m" :key="item" class="item__row">
                <img :src="'/map-images/item-images/' + itemName(item.toString(), true) + '.png'" class="item__image" />
                <span>
                    {{ amount }}
                    {{ itemName(item.toString()) }}
                </span>
            </div>
        </div>

        <div class="card__button" role="button" @click.stop.prevent="handleProgress()">
            <div class="card__button-text">
                <svg v-if="progress.get()[upgrade] >= index + 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                        d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"
                    />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z" />
                </svg>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {itemName} from "../utils";

import {quarterProgress} from "../trackProgress";
export default defineComponent({
    props: ["index", "name", "m", "image", "upgrade"],
    data() {
        return {
            progress: quarterProgress,
        };
    },
    methods: {
        itemName(item: string, urlFormat?: boolean): string {
            return itemName(item, urlFormat);
        },

        handleProgress(): void {
            // This function handles the progress upon click of the part toggler.
            const currentProgress = this.progress.get()[this.upgrade];

            // if the current progress is equal to the current part
            // progress starts at one, index at 0
            if (currentProgress == this.index + 1) {
                // then that means we click it and want to undo it, setting the current
                // progress to the card before it
                this.progress.setPart(this.upgrade, this.index, "upgrade");
            } else {
                // otherwise, set it to the card we click
                this.progress.setPart(this.upgrade, this.index + 1, "upgrade");
            }
        },
    },
});
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
    --border-radius: 0.5rem;
    --duration: 0.3s;
    --timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --delay: 0s;

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

    opacity: 0.1;
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

.card:hover .card__image-img {
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
    scale: 1.2;
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
    fill: var(--rarity-color-rare);
}

.card__costs {
    position: absolute;
    width: calc(100% - var(--padding));
    top: 20%;
    left: var(--padding);
}

.item__row {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 1rem;

    margin-bottom: 0.7rem;

    height: 1.6rem;
}

.item__row span {
    text-overflow: ellipsis;
    font-size: 80%;
}

.item__image {
    height: 100%;
    translate: 0 -5px;
}

@media screen and (max-width: 900px) {
    .card__costs {
        font-size: 2rem;
        width: fit-content;
    }
    .item__image {
        opacity: 0;
        pointer-events: none;
    }

    .item__row span {
        grid-column: 2;
    }
}
</style>
