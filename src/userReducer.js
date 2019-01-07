import update from 'immutability-helper'

const initState = {
  profile: {
    isAuthenticated: false
  },
  wallets: [],
}

export default function (state = initState, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      profile: action.payload.profile
    }
  default: // need this for default case
    return state
  }
}
