import Vue from 'vue'
import * as types from './mutation-types';

export default {
    [types.SET_ACTIVE_PARSER](state, parser){
        state.activeParser = parser;
    },
    [types.UPDATE_COLUMN_DATA](state, { columnId, data }){
        Vue.set(state.columnData, columnId, data);
    },
    [types.DELETE_COLUMN_LOCAL](state, { columnId, parserId }){
        Vue.delete(state.columnData, columnId);
    },

  };