import types from './types'

export const setFormValues = (values) => {
    return {
        type: types.FORM_SET_VALUES,
        values
    }
}

export const addCustomItem = (item) => {
    return {
        type: types.FORM_ADD_CUSTOM_ITEM,
        item
    }
}