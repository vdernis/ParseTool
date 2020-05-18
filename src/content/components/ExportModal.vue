<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
      exportColumns(e){
        if(this.$store.getters.columnSet.length == 0){
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.$store.getters.columnSet));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "export.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

      },
      exportRows(e){
        this.rows = [];
        this.maxDataList = 0;

        this.$store.getters.columnSet.forEach((column, index) => {
            if(column.data.length > this.maxDataList) {
                this.maxDataList = column.data.length;
            }
        });

        for(let i=0; i < this.maxDataList; i++){
            this.rows[i] = {}
            this.$store.getters.columnSet.forEach((column, index) => {
                this.rows[i][column.info.title.replace(/\s+/g, '-').toLowerCase()] = column.data[i];
            })
        }


        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.rows));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "export.json");
        document.body.appendChild(downloadAnchorNode); 
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

      },

      exportData(e) {
          if(this.groupby === "row"){
              this.exportRows(e);
          }
          else {
              this.exportColumns(e);
          }
      }, 

      toggleAutoUpload(){
          this.activeParser.autoUpload = !this.activeParser.autoUpload;
          this.$store.dispatch('updateParser', this.activeParser);

      },
      toggleAutoParse(){
          this.activeParser.autoParse = !this.activeParser.autoUpload;
          this.$store.dispatch('updateParser', this.activeParser);

      },
      setFormat(format){
          this.format=format;
      },
      setGroupby(groupby){
          this.groupby=groupby;
      }
    },
    computed: {
      ...mapGetters(['activeParser']),
    },
    data() {
       return  {
           format: "json",
           groupby: "row"
       }
    }
  };
</script>

<template>
  <div class="pt-modal" @click="close">
    <div class="pt-modal__window" @click.stop>
        <div class="pt-modal__settings">
            <h2>Group by</h2>
<label class="pt-radio">Row
                <input type="radio" :checked="this.groupby == 'row'" name="groupby" value="row">
                <span class="pt-checkmark" @click="setGroupby('row')"></span>
            </label>
<label class="pt-radio">Column
                <input type="radio" :checked="this.groupby == 'column'"  name="groupby" value="column">
                <span class="pt-checkmark" @click="setGroupby('column')"></span>
            </label>
        </div>
        <div class="pt-modal__exports">
            <input class="pt-modal__export-option" type="submit" value="Export" @click="exportData" />
        </div>
    </div>
  </div>
</template>