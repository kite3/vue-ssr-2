import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
const fetchItems = function () {
  return new Promise((resolve, reject) => {
    const items = [
      { name: 'zhangsan', age: 25 },
      { name: 'lisi', age: 26 },
      { name: 'wangwu', age: 27 }
    ]
    setTimeout(() => {
      resolve(items)
    }, 300)
  })
}

const fetchObjMsg = function () {
  return new Promise((resolve, reject) => {
    const objMsg = {
      x: 1,
      y: 2,
      z: 3
    }
    setTimeout(() => {
      resolve(objMsg)
    }, 300)
  })
}

export function createStore() {
  return new Vuex.Store({
    state: {
      items: [],
      objMsg: {}
    },
    actions: {
      fetchItems({ commit }) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItems().then((items) => {
          commit('setItems', items)
        })
      },
      fetchObjMsg({ commit }) {
        return fetchObjMsg().then(objMsg => {
          commit('setObjMsg', objMsg)
        })
      }
    },
    mutations: {
      setItems(state, items) {
        this.state.items = items
      },
      setObjMsg(state, objMsg) {
        this.state.objMsg = objMsg
      }
    },
  })
}
