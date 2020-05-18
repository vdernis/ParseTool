import * as types from './mutation-types';
import * as rootTypes from '../mutation-types';



export const setActiveParser = async ({ commit, rootState }, parserId) => {
    let parser = rootState.parsers[parserId];
    commit(types.SET_ACTIVE_PARSER, parser);
    return true;
}

export const createColumn = async ({ commit }, payload) => {
    commit(rootTypes.CREATE_COLUMN_INFO, payload);
    commit(types.UPDATE_COLUMN_DATA, {columnId: payload.id, data:payload.data });
    return true;
}

export const updateColumnData = async ( { commit, state }, payload) => {
    commit(types.UPDATE_COLUMN_DATA, {columnId: payload.columnId, data:payload.data});

}

export const updateColumn = ( { commit }, payload) => {
    commit(types.UPDATE_COLUMN_DATA, {columnId: payload.id, data:payload.data });
    commit(rootTypes.UPDATE_COLUMN_INFO, payload);
    //setParserUpdate(payload.parserId);
}

export const deleteColumn = ( { commit }, payload) => {
    commit(types.DELETE_COLUMN_LOCAL, {columnId: payload.info.id, parserId: payload.info.parserId })
    commit(rootTypes.DELETE_COLUMN_GLOBAL, {columnId: payload.info.id, parserId: payload.info.parserId })
    //setParserUpdate(payload.info.parserId);
}