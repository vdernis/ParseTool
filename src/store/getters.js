export const token = state => state.token;
export const isAuthenticated = state => state.isAuthenticated;
export const username = state => state.username;
export const parserSet = state => state.parserList.map(parserId => { return state.parsers[parserId];});
export const state = state => state;
export const parserList = state => state.parserList;
export const parsers = state => state.parsers;
export const columnInfo = state => state.columnInfo;

