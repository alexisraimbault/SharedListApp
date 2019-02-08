const initialState = { userInfo:{} }

function userReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'USER_INFO':
        nextState = {
          ...state,
          userInfo:action.value
        }
      return nextState || state
  default:
    return state
  }
}

export default userReducer
