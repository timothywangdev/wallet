import update from 'immutability-helper'

const initState = {
  profile: {
    isAuthenticated: false
  },
  wallet: {
    fileId: null,
    content: []
  }
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        profile: action.payload.profile
      }
    case 'CREATE_ADDRESS_FULFILLED':
      return {
        ...state,
        wallet: action.payload
      }
    case 'GET_ADDRESSES_FULFILLED':
      return {
        ...state,
        wallet: action.payload
      }
    default: // need this for default case
      return state
  }
}
