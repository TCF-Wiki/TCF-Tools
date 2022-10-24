<template>
<div> 
    <header class="modal__header"> 
        <h2>  
            <div> 
                {{ name }} 
            </div>
        </h2>
    </header>
    <section class="quarter-parts"> 
        <div v-for="m, index in data['levels']" class="container">
            <QuarterTechPartCard 
                :m="m['costs']"
                :index="index"
                :image="imageName"
                :upgrade="upgrade"
            />
        </div>
    </section>



</div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import { techTreeData } from '../data';
import QuarterTechPartCard from './QuarterTechPartCard.vue'


export default defineComponent({
    props: ['upgrade', 'name', 'imageName'],
    components: {
        QuarterTechPartCard
    },
    data() {
        return {
            data: techTreeData[this.upgrade]
        }
    },
    mounted() {        
    },
    computed: {
    },
    methods: {
        

    }
})
</script>

<style scoped>


.modal__header h2 {
    font-family: sans-serif;
    text-transform: initial;
    letter-spacing: .2rem;
    margin-bottom: 1.5rem;
}

.modal__header h2 div {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.modal__header-image {
    margin: 0;
    scale: 0.7;
    translate: 0 -.5rem;
}



@media screen and (max-width: 900px) {
    .modal__header h2 {
        font-size: 2rem;
    }

    .modal__header-image {
        display: none;
    }

    .modal__description {
        max-width: 90%;
    }

}
.quarter-parts {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    max-width: 100%;

    gap: 3rem;
    margin-bottom: 20rem;
}

@media screen and (max-width: 1500px) {
    .quarter-parts {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media screen and (max-width: 1200px) {
    .quarter-parts {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 900px) {
    .quarter-parts {
        grid-template-columns: 1fr;
        margin: auto;
    }
}

.container {
    position: relative;
}


</style>