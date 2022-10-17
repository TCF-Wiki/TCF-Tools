<template>
  <div class="forgeClear-Button" role="button" @click="clearItems()"
  >
      <img class="clearBtn-Image" src="forge-images/Clear_Button_Ready.png" v-if="Object.keys(selectedItems.get()).length > 0 || Object.keys(outputItems.get()).length > 0">
      <img class="clearBtnHover-Image" src="forge-images/Clear_Button_Hover.png">
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
    z-index: 2;

    position: absolute;
}

.forgeClear-Button:hover .clearBtnHover-Image {
    opacity: 1;
}

.forgeClear-Button:hover .clearBtn-Image {
  display: none;
}
.clearBtnHover-Image {
    position: absolute;
    opacity: 0;
    transition: all .2s ease-out;
    transform: scale(1.80) translateY(-20%) translateX(-.5%);
    left: 10.5%;
    max-width: 75%;
    bottom: -59%;
}


.clearBtn-Image {
    position: absolute;
    transition: all .2s ease-out;
    animation: pulse 5s infinite;
}

</style>