import types from './types'

export const setConstantChoices = (values) => {
    return {
        type: types.CHOICES_SET_CONSTANT,
        values
    }
}

export const addCustomItem = (item) => {
    return {
        type: types.CHOICES_ADD_CUSTOM_ITEM,
        item
    }
}

export const setSelectedState = (state) => {
    return {
        type: types.CHOICES_SET_SELECTED_STATE,
        state
    }
}