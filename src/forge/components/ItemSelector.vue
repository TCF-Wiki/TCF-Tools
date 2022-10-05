<template>
<details>
    <summary>  
        <div class="container"> 
            <div>
                <h2> Ingot Items</h2>
            </div>

            <div>
                <h2> Gear Items </h2>
            </div>

            <div>
                <h2> Recipe Items </h2>
            </div>

            <div>
                <h2> Special Items </h2>
            </div>
        </div>   
    </summary>

        <div class="container">
            <div>
                <p v-for="item in validItems.ingots" @click="selectedItems.add(item)" role="button" class="selector">
                    {{ item }}
                </p>
            </div>
            <div>
                
            </div>
            <div>
                <p v-for="item in validItems.perkRecipes" @click="selectedItems.add(item)" role="button" class="selector">
                    {{ item }}
                </p>
            </div>
            <div>
                <p v-for="item in validItems.special" @click="selectedItems.add(item)" aria-role="button" class="selector">
                    {{ item }}
                </p>

            </div>
        </div>

</details>

{{ selectedItems }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { validItems } from '../ValidItems'
import { selectedItems } from '../store';
export default defineComponent({
    data() {
        return {
            validItems: validItems,
            selectedItems
        }
    }
})

</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.selector {
    cursor: pointer;
}

details {
    width: 80%;
}
</style>