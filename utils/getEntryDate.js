import moment from "moment";

const getEntryDate=(entryDate)=>{
    const date = moment(entryDate).format('DD MMM YYYY')
    const time = moment(entryDate).format('h:mm A')
    const utcDate = moment.utc(entryDate);
    const today = moment.utc().startOf('day');
    if (utcDate.isSame(today, 'day')) {
        return `Today at ${time}`
    } else {
        return `${date} at ${time}`
    }
}

export default getEntryDate