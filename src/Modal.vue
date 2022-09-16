<script lang="ts">
import  { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  });
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </section>

      </div>
    </div>
  </transition>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    z-index: 1;
  }

  .modal {
    background: var(--background-menu-color);
    box-shadow: 2px 2px 20px 1px var(--background-menu-color);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
    z-index: 1;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: var(--text-color-body-white);
    justify-content: space-between;
    z-index: 1;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    z-index: 1;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 3rem;
    padding: .5rem;
    cursor: pointer;
    font-weight: bold;
    color: var(--rarity-color-exotic);
    background: transparent;
  }


  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>