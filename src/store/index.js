import Vue from 'vue';
import Vuex from 'vuex';
import VuexWebExtensions from 'vuex-webextensions';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';
import local from './local';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: false,
        isAuthenticated: false,
        isLoggingIn: false,
        exp: 0,
        username: '',
        parsers: {},
        parserList:[],
        columnInfo: {},
        activeParserId: false,
    },
    getters,
    mutations,
    actions,
    modules: {
        local: local,
    },
    plugins: [
      VuexWebExtensions({
          persistentStates: [
              'token', 'isAuthenticated', 'exp', 'username', 
              'parsers', 'parserList', 'columnInfo'],
        loggerLevel: 'verbose',
        syncActions: false
      }),
    ],
});