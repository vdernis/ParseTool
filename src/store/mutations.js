import Vue from 'vue'
import * as types from './mutation-types';

export default {
    [types.LOGIN](state, payload) {
        state.username = payload.username;
        state.password = payload.password;
        state.exp = payload.exp;
        state.token = payload.token;
        state.isAuthenticated = true;
    },
    [types.LOGOUT](state) {
        state.username = "";
        state.password = "";
        state.exp = 0;
        state.token = false;
        state.isAuthenticated = false;
    },
    [types.CREATE_PARSER](state, payload) {
        state.parserList.push(payload.id);
        Vue.set(state.parsers, payload.id, payload);
        Vue.set(state.parsers[payload.id], "columnList", []);
    },
    [types.UPDATE_PARSER](state, payload){
        Vue.set(state.parsers, payload.id, payload);
    },
    [types.DELETE_PARSER](state, parserId){
        Vue.delete(state.parsers, parserId);
        let i = state.parserList.findIndex(id => id == parserId)
        state.parserList.splice(i, 1)
    },
    [types.CREATE_COLUMN_INFO](state, payload){
        state.parsers[payload.parserId].columnList.push(payload.id);
        Vue.set(state.columnInfo, payload.id, {id: payload.id, title: payload.title, path: payload.path, parserId: payload.parserId} );
    },
    [types.UPDATE_COLUMN_INFO](state, payload){
        Vue.set(state.columnInfo, payload.id, {id: payload.id, title: payload.title, path: payload.path, parserId: payload.parserId} );
    },
    [types.DELETE_COLUMN_GLOBAL](state, {columnId, parserId}){
        Vue.delete(state.columnInfo, columnId);
        let i = state.parsers[parserId].columnList.findIndex(colId => colId == columnId)
        state.parsers[parserId].columnList.splice(i, 1)
    },


  };