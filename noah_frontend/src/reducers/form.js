import types from '../actions/types'

export default (state, action) => {
    switch(action.type) {
        case types.FORM_SET_VALUES:
            return action.values

        case types.FORM_ADD_CUSTOM_ITEM:
            return {
                ... state,
                items: state.items.concat(action.item)
            }

        default:
            return {
                districts: {},
                items: [],
                states: []
            }
    }
}