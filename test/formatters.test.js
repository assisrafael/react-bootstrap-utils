import {toDatetimeLocal} from '../src/utils/formatters'

test('toDatetimeLocal should format date object into YYYY-MM-DDThh:mm', () =>{
    // common dates
    let year = 2020;
    let monthList = [2, 10];
    let dayList = [1, 19]; // 1 to 12
    let hourList = [1, 12];
    let minutesList = [1, 30];
    let secondsList = [0, 30];
    let millisecondsList = [0, 100];
    for(let i = 0; i < 2; i++){
        let month = monthList[i] - 1; // 0 to 11
        let date = new Date(year, month, dayList[i], hourList[i],
            minutesList[i], secondsList[i], millisecondsList[i]);
        let yearFormat = year.toString();
        let monthFormat = monthList[i].toString().padStart(2, '0');
        let dayFormat = dayList[i].toString().padStart(2, '0');
        let hourFormat = hourList[i].toString().padStart(2, '0');
        let minutesFormat = minutesList[i].toString().padStart(2, '0');
        let dateFormat = toDatetimeLocal(date);
        expect(dateFormat).toBe(`${yearFormat}-${monthFormat}-${dayFormat}T${hourFormat}:${minutesFormat}`);
    }
    
    // common strings
    let dateString = '2020-11-19T16:35:00.000Z'
    let dateFormat = toDatetimeLocal(dateString);
    expect(dateFormat).toBe('2020-11-19T13:35'); // GMT -03:00 because of the timezone

    // invalid parameter
    expect(() => toDatetimeLocal(2020)).toThrow(Error)
    expect(() => toDatetimeLocal('2020')).toThrow(Error)
    expect(() => toDatetimeLocal('19/11/2020')).toThrow(Error)
    expect(() => toDatetimeLocal(undefined)).toThrow(Error)
    expect(() => toDatetimeLocal(-1)).toThrow(Error)
})