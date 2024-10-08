const getDefaultState = () => {
  return {
    buttons: []
  }
}

const state = getDefaultState()

const mutations = {
  SAVE_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  }
}

const actions = {
  // 存储该角色所有按钮
  save({ commit }, buttons) {
    // console.log(buttons)
    commit('SAVE_BUTTONS', buttons)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
