<template>
  <div class="forgeClear-Button" role="button" @click="clearItems()"
  >
      <img class="clearBtn-Image" src="/forge-images/Clear_Button_Ready.png" v-if="Object.keys(selectedItems.get()).length > 0 || Object.keys(outputItems.get()).length > 0">
      <img class="clearBtnHover-Image" src="/forge-images/Clear_Button_Hover.png">
  </div>

</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { outputItems, selectedItems } from '../store';

export default defineComponent({
  data() {
      return {
          outputItems,
          selectedItems,
      }
  },
  methods: {
      clearItems(): void {
          outputItems.clear()
          selectedItems.clear()
      }
  }
});
</script>
<style scoped>
.forgeClear-Button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;

}

.clearBtn-Image {
    position: absolute;
    transition: all .2s ease-out;
    animation: pulse 5s infinite;

    
}

img {
    filter: hue-rotate(-70deg) !important;
}

.clearBtnHover-Image {
    opacity: 0;
    position: absolute;
    transition: all .2s ease-out;
    transform: scale(1.70);
    left: .5%;
}

.forgeClear-Button:hover .clearBtnHover-Image {
    opacity: 1;
}

.forgeClear-Button:hover .clearBtn-Image {
  opacity: 0;
}

</style>