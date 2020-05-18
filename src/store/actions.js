import axios from 'axios';
import * as types from './mutation-types';
import * as localTypes from './local/mutation-types';


export const createParser = async ({ commit }, payload) => {
    commit(types.CREATE_PARSER, payload);
    commit(localTypes.SET_ACTIVE_PARSER, payload);
    return true;
}

export const updateParser = async ({ commit }, payload) => {
    commit(types.UPDATE_PARSER, payload);
    commit(localTypes.SET_ACTIVE_PARSER, payload);
    return true;
}

export const deleteParser = async ({ commit, state }, parserId) => {
    state.parsers[parserId].columnList.forEach(function(colId){
        commit(types.DELETE_COLUMN_GLOBAL, {columnId: colId, parserId: parserId});
    });

    commit(types.DELETE_PARSER, parserId);
}

