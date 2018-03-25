import {
    OPEN_REPORT,
    CLOSE_REPORT_SOFT,
    CLOSE_REPORT_HARD,
 } from '../actions'

import { snackbar, dialog } from '../actions/const'

const initial = {
    [snackbar]: {
        open: false,
    },
    [dialog]: {
        open: false,
    },
}

const reports = (state = initial, action) => {
    switch (action.type) {
    case OPEN_REPORT:
        return {
            ...state,
            [action.item]: { ...action.props, open: true },
        }

    case CLOSE_REPORT_HARD:
        return { ...initial }

    case CLOSE_REPORT_SOFT:
        return {
            ...state,
            [action.item]: initial[action.item],
        }

    default:
        return state
    }
}

export default reports