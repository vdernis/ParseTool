import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

export default {
    state: { 
        columnData: {},
        activeParser: false,
    },
    getters,
    mutations,
    actions,
}
