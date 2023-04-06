import React from "react";


export default function Calendar({ date }) {

    const thisDay = date; // получили дату из app.
    const firstDay = new Date(2017, 2, 8); // пока не придумал как скопировать, просто создаю новую дату - частный случая для сегодня.
    firstDay.setDate(1); // устанавливую дату на первое число этого месяца - понадобится в вычислении дня недели.
    const month = thisDay.getMonth(); // получаем текущий месяц.
    const year = thisDay.getFullYear(); // получаем текущий год.
    const lastDay = new Date(year, month + 1, 0).getDate(); // получаем последний день текущего месяца. 
    const lastDayPreious = new Date( year, month, 0).getDate(); // получаем последний день прошлого месяца.

    let monthArr = Array.from({length: lastDay}, (_, i) => i + 1); // делаем массив текущего месяца.
    const monthClasses = Array(monthArr.length).fill("ui-datepicker-this-month") // делаем дорожную карту дат этого месяца.
    const lastMonthArr = Array.from({length: lastDayPreious}, (_, i) => i + 1); // делаем массив предыдущего месяца.
    
    
    const firstDayinWeek = firstDay.getDay(); // получаем день недели начала текущего месяца.
    const lastMonthMargin = firstDayinWeek - 1; // получаем смещение по дням относительно понедельника.
    const lastMontMarginDays = lastMonthArr.slice(-lastMonthMargin); // получаем требуемые числа последнего месяца.
    const lastMonthMarginDaysClasses = Array(lastMontMarginDays.length).fill("ui-datepicker-other-month") // делаем дорожную карту для дат прошлого месяца.
    monthClasses[thisDay.getDate() - 1] = "ui-datepicker-this-month ui-datepicker-today"; //ставим класс для нужного дня.

    monthArr = lastMontMarginDays.concat(monthArr); // дополняем массив месяца.
    const nextMonthArr = Array.from({length: 35 - monthArr.length}, (_, i) => i + 1); // получаем числа от следующего месяца.
    const nextMonthMarginDaysClasses = Array(nextMonthArr.length).fill("ui-datepicker-other-month"); // делаем дорожную карту для дат следующего месяца.
    monthArr = monthArr.concat(nextMonthArr); // дополняем массив месяца.

    const classes = [
        ...lastMonthMarginDaysClasses, ...monthClasses, ...nextMonthMarginDaysClasses
    ] // объединяем все карты.
     
    

    const laidOutArray = monthArr.map((i, index) => {
        return {
            className: classes[index],
            day: i
        }
    }) // формируем массив объектов для выкладки таблицы.

    
    let  [chunked,chunkSize] = [laidOutArray, 7];
    chunked = [...Array(Math.ceil(chunked.length / chunkSize))].map(_ => chunked.splice(0,chunkSize)) // разбили массив по неделям.

    
    const laidOut = chunked.map((item, index)=> (
        <tr key={index}>{item.map((i, itemIndex) => (
              <td className={i.className} key={itemIndex}>{i.day}</td> 
        ))}  
        </tr>    
    )) // выкладка

    let materialDay;

    switch (thisDay.getDay()) {
        case 0:
            materialDay = "Воскресенье"
            break;
        case 1:
            materialDay = "Понедельник"
            break;
        case 2:
            materialDay = "Вторник"
            break;
        case 3:
            materialDay = "Среда"
            break;
        case 4:
            materialDay = "Четверг"
            break;
        case 5:
            materialDay = "Пятница"
            break;
        case 6:
            materialDay = "Суббота"
            break;
        default:
            alert( "Черный четверг!" );   
    }

    let monthsParental = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня","Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let monthsDeclarative = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    
    
    return <div className="ui-datepicker">
                <div className="ui-datepicker-material-header">
                    <div className="ui-datepicker-material-day">{materialDay}</div>
                    <div className="ui-datepicker-material-date">
                        <div className="ui-datepicker-material-day-num">{thisDay.getDate()}</div>
                        <div className="ui-datepicker-material-month">{monthsParental[thisDay.getMonth()]}</div>
                        <div className="ui-datepicker-material-year">{thisDay.getFullYear()}</div>
                    </div>
                </div>
                <div className="ui-datepicker-header">
                    <div className="ui-datepicker-title">
                        <span className="ui-datepicker-month">{monthsDeclarative[thisDay.getMonth()]}</span>&nbsp;<span className="ui-datepicker-year">{thisDay.getFullYear()}</span>
                    </div>
                </div>
                <table className="ui-datepicker-calendar">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="ui-datepicker-week-end" />
                        <col className="ui-datepicker-week-end" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col" title="Понедельник">Пн</th>
                            <th scope="col" title="Вторник">Вт</th>
                            <th scope="col" title="Среда">Ср</th>
                            <th scope="col" title="Четверг">Чт</th>
                            <th scope="col" title="Пятница">Пт</th>
                            <th scope="col" title="Суббота">Сб</th>
                            <th scope="col" title="Воскресенье">Вс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laidOut}
                    </tbody>
                </table>
            </div>
}