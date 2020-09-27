import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface InSidebar {
  show: boolean;
  type: string;
}
export interface InProject {
  show: boolean;
  name?: string;
  path?: string;
}

export interface InDep {
  event?: string;
  type: string;
  name?: string;
  version?: string;
}

export interface InSetting {
  show?: boolean;
  type?: string;
}
export interface VuexState {
  sidebar?: InSidebar;
  project?: InProject;
  dep?: InDep;
  setting?: InSetting;
}

const initState: VuexState = {
  sidebar: {
    show: true,
    type: 'global'
  },
  project: {
    show: true,
    name: '',
    path: ''
  },
  dep: {
    event: '', // view: 查看 update: 升级 add: 添加
    type: 'global',
    name: '',
    version: ''
  },
  setting: {
    show: false,
    type: 'global'
  }
}

export default new Vuex.Store({
  state: {
    ...initState
  },
  getters: {
    getSidebar: state => {
      return state.sidebar
    },
    getDep: state => {
      return state.dep
    },
    getSetting: state => {
      return state.setting
    }
  },
  mutations: {
    setSidebar: (state, payload) => {
      state.sidebar = payload
    },
    setDep: (state, payload) => {
      state.dep = payload
    },
    setSetting: (state, payload) => {
      state.setting = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
