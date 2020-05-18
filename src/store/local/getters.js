export const activeParser = state => state.activeParser;
export const columnInfoSet = (state,rootState) => {
   
    let parser = rootState.parsers[state.activeParser.id];
   
    return parser.columnList.map(columnId => {
        return rootState.columnInfo[columnId]
    });
}
export const columnSet = (state,rootState) => {
    let parser = rootState.parsers[state.activeParser.id];
    return parser.columnList.map(columnId => {
        return {
            info: rootState.columnInfo[columnId],
            data: state.columnData[columnId]
        }
    });
}
export const columnData = (state) => state.columnData;
