export default {
  ADD_ITEM(state, { id, title, description, category, createdAt }) {
    state.items.push({
      id,
      title,
      description,
      category,
      complete: false,
      createdAt
    })
  },
  UPDATE_ITEM(state, { id, title, description, category }) {
    const todo = state.items.find(item => item.id === id)

    todo.title = title
    todo.description = description
    todo.category = category
  },
  TOGGLE_COMPLETE(state, id) {
    const todo = state.items.find(item => item.id === id)
    todo.complete = !todo.complete
  },
  REMOVE_ITEM(state, id) {
    state.items.splice(
      state.items.findIndex(item => item.id === id),
      1
    )
  },
  REMOVE_ALL(state) {
    state.items = []
  }
}
