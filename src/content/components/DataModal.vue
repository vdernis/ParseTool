<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
    computed: {
      ...mapGetters(['columnSet'])
    }
  };
</script>

<template>
  <div class="pt-modal" @click="close">
    <div class="pt-modal__window">
        <div class="pt-table">
          <div class="pt-col" v-for="column in columnSet" v-bind:key="column.id">

            <div class="pt-col__item--header">
              {{ column.info.title }}
            </div>
            <div class="pt-col__item" v-for="(item,index) in column.data" v-bind:key="index">
              <div v-if="item.textContent != ''">
                 {{ item.textContent }}
              </div>
              <div v-else-if="item.src != null">
                {{ item.src }}
              </div>
             
            </div>

          </div>
        </div>
    </div>
  </div>
</template>