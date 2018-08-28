import types from '../actions/types'
import { combineReducers } from 'redux';

const constants = (state, action) => {
    switch(action.type) {
        case types.CHOICES_SET_CONSTANT:
            return action.values

        default:
            return state || {
                districts: {},
                items: [],
                states: []
            }
    }
}

const customItems = (state, action) => {
    switch(action.type) {
        case types.CHOICES_ADD_CUSTOM_ITEM:
            return state.concat(action.item)
        
        default:
            return state || []
    }
}

const selectedState = (state, action) => {
    switch(action.type) {
        case types.CHOICES_SET_SELECTED_STATE:
            return action.state
        
        default:
            return "Kerala"
    }
}

export default combineReducers({
    constants,
    customItems,
    selectedState
})