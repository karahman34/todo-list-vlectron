export default {
  SET_NAVBAR_SEARCH(state, value) {
    state.navbarSearch = value
  },
  SET_TODO_NAV_TAB(state, value) {
    state.todoNavTabActive = value.toLowerCase()
  },
  SET_DELETE_DIALOG(state, { text, callback }) {
    state.deleteDialog = {
      text,
      callback
    }
  }
}
