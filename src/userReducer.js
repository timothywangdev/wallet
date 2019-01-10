import update from 'immutability-helper'

const initState = {
  profile: {
    isAuthenticated: false
  },
  wallet: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        profile: action.payload.profile
      }
    case 'CREATE_ADDRESS_FULFILLED':
      return update(state, { wallet: { $push: [action.payload] } })
    default: // need this for default case
      return state
  }
}
