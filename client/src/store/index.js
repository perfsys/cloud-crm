import Vue from 'vue'
import Vuex from 'vuex'

import contacts from './modules/contacts'
import groups from './modules/groups'
import countries from './modules/countries'
import sources from './modules/sources'
import types from './modules/types'
import statuses from './modules/statuses'
import updates from './modules/updates'
import companies from './modules/companies'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    contacts,
    groups,
    countries,
    sources,
    types,
    statuses,
    updates,
    companies
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
