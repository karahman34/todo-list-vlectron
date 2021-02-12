export default {
  todosLength: state => {
    return state.items.length
  },
  lastItem: state => {
    return state.items[state.items.length - 1]
  },
  findById: state => id => {
    return state.items.find(item => parseInt(item.id) === parseInt(id))
  },
  filter: state => ({ search, tab, order, page, limit }) => {
    const filteredItems = state.items.filter(item => {
      if (
        search &&
        !(item.title.includes(search) || item.description.includes(search))
      ) {
        return false
      }

      if (tab === 'active' && item.complete === true) {
        return false
      } else if (tab === 'complete' && item.complete === false) {
        return false
      }

      return item
    })

    if (order === 'newest') {
      filteredItems.reverse()
    }

    const finalItems = []
    for (const todo of filteredItems.slice((page - 1) * limit)) {
      if (finalItems.length === limit) {
        break
      } else {
        finalItems.push(todo)
      }
    }

    return {
      meta: {
        total: filteredItems.length
      },
      data: finalItems
    }
  }
}
