export const OPEN_REPORT = 'OPEN_REPORT'
export const CLOSE_REPORT_SOFT = 'CLOSE_REPORT_SOFT'
export const CLOSE_REPORT_HARD = 'CLOSE_REPORT_HARD'

export const SET_MOCK = 'SET_MOCK'

function openReport(item, props) {
    return {
        type: OPEN_REPORT,
        item,
        props,
    }
}

function closeReport(item, field) {
    return {
        type: CLOSE_REPORT_SOFT,
        item,
        field,
    }
}

export {
    openReport,
    closeReport,
}