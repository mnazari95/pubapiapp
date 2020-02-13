import DateFormat from 'dateformat';

export default class PostTime {

    formatDate(date){
        const parsedDate = Date.parse(date);
        return DateFormat(parsedDate, "mediumDate", true, false);
    }
}