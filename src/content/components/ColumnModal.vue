<script>
  import { mapGetters } from 'vuex'
  import { getDataList } from '../utils/queries';

  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        let col = {
          title: this.title, 
          id: this.column.info.id, 
          path: this.path,
          parserId: this.column.info.parserId,
          data: getDataList(document, this.path)
        }

        this.$store.dispatch('updateColumn', col);

      },
    },
    computed: {
      ...mapGetters(['columnSet'])
    },
    props:["column"],
    data() {
        return  {
            title: this.column.info.title,
            path: this.column.info.path,
        }
    }
  };
</script>

<template>
  <div class="pt-modal" @click="close">
    <div class="pt-modal__window" @click.stop>

<label for="title">Title</label>
  <input type="text" v-model="title" />

  <label for="path">Path</label>
  <input type="text" v-model="path" />

  <input type="submit" value="Save" @click="save" />
    </div>
  </div>
</template>

