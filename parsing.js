jQuery(document).ready(function($)
{
    var mean = undefined;
    $(document).ready(function () 
    {
        mean = undefined;
        $('input[name=week]').change(function() 
        {
            mean = undefined;
            console.log(mean);
            $("#submit_form").click(function () 
            {
                $('#info').html('');
                $('#schedule').html('');
                mean = $('input[name=week]:checked').val();
                console.log(mean);
                var grouppaid = [];
                $.each($("#mygrupa option:selected"), function () 
                {
                    grouppaid.push($(this).val());
                    /* function readTextFile(file, callback) 
                    {
                        var rawFile = new XMLHttpRequest();
                        rawFile.overrideMimeType("application/json");
                        rawFile.open("GET", file, true);
                        rawFile.onreadystatechange = function() 
                        {
                            if (rawFile.readyState === 4 && rawFile.status == "200") 
                            {
                                callback(rawFile.responseText);
                            }
                        }
                        rawFile.send(null);
                    }
                    readTextFile(`https://github.com/Arti25/diploma/blob/master/${grouppaid}.txt`, function(text)
                        {
                            var data = JSON.parse(text);
                            console.log(data);
                            getTableInfo(data);
                        });  */

                    fetch(`https://raw.githubusercontent.com/Arti25/diploma/master/${grouppaid}.txt`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        getTableInfo(data);
                        console.log(data);
                    });

                    function getWeekNumber(d)
                    {
                        // Copy date so don't modify original
                        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                        // Set to nearest Thursday: current date + 4 - current day number
                        // Make Sunday's day number 7
                        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
                        // Get first day of year
                        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
                        // Calculate full weeks to nearest Thursday
                        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
                        // console.log(weekNo);
                        // Return array of year and week number
                        return [weekNo];
                    }
                    var weekNumber = getWeekNumber(new Date());
                    console.log(weekNumber);
                    function getTableInfo(data) 
                    {
                        //console.log(Array.isArray(data.schedule));
                        let current = 0;
                        let following = 1;
                        let headerTr = document.createElement('tr');
                        headerTr.innerHTML = 
                            `<th>День</th><th>Пара</th><th>Старт пари</th>
                            <th>Кінець пара</th><th>Предмет</th><th>Кабінет</th>
                            <th>Група</th><th>Викладач</th>`;
                        if(mean == "current_week")
                        {
                            var scheduleTable = document.getElementById('schedule');
                            info = document.getElementById('info');
                            info.innerHTML = 
                                `<div>Факультет: ${data.faculty}</div>
                                <div>Курс: ${data.course}</div> 
                                <div>Група: ${data.group}</div>`;
                            scheduleTable.appendChild(headerTr);
                            var weekNumber1 = +current + +weekNumber;
                            console.log(weekNumber1);
                            if(weekNumber1 & 1)
                            {
                                data.firstweek.forEach(function(elem) 
                                {
                                    let tr = document.createElement('tr');
                                    tr.innerHTML = 
                                        `<td>${elem.day}</td><td>${elem.pair}</td>
                                        <td>${elem.start}</td><td>${elem.end}</td>
                                        <td>${elem.subject}</td><td>${elem.room}</td>
                                        <td>${elem.group}</td><td>${elem.teacher}</td>`;
                                    schedule.appendChild(tr);
                                });
                            }
                            else 
                            {
                                var scheduleTable = document.getElementById('schedule');
                                info = document.getElementById('info');
                                info.innerHTML = 
                                    `<div>Факультет: ${data.faculty}</div>
                                    <div>Курс: ${data.course}</div> 
                                    <div>Група: ${data.group}</div>`;
                                scheduleTable.appendChild(headerTr);
                                data.secondweek.forEach(function(elem) 
                                {   
                                    let tr = document.createElement('tr');
                                    tr.innerHTML = 
                                    `<td>${elem.day}</td><td>${elem.pair}</td>
                                    <td>${elem.start}</td><td>${elem.end}</td>
                                    <td>${elem.subject}</td><td>${elem.room}</td>
                                    <td>${elem.group}</td><td>${elem.teacher}</td>`;
                                    schedule.appendChild(tr);
                                });
                            }
                        }
                        else if(mean == "next_week")
                        {
                            var scheduleTable = document.getElementById('schedule');
                            info = document.getElementById('info');
                            info.innerHTML = 
                                `<div>Факультет: ${data.faculty}</div>
                                <div>Курс: ${data.course}</div> 
                                <div>Група: ${data.group}</div>`;
                            scheduleTable.appendChild(headerTr);
                            var weekNumber2 = +following + +weekNumber;
                            console.log(weekNumber2);
                            if(weekNumber2 & 1)
                            {
                                data.firstweek.forEach(function(elem) 
                                {
                                    let tr = document.createElement('tr');
                                    tr.innerHTML = 
                                        `<td>${elem.day}</td><td>${elem.pair}</td>
                                        <td>${elem.start}</td><td>${elem.end}</td>
                                        <td>${elem.subject}</td><td>${elem.room}</td>
                                        <td>${elem.group}</td><td>${elem.teacher}</td>`;
                                    schedule.appendChild(tr);
                                });
                            }
                            else 
                            {
                                var scheduleTable = document.getElementById('schedule');
                                info = document.getElementById('info');
                                info.innerHTML = 
                                    `<div>Факультет: ${data.faculty}</div>
                                    <div>Курс: ${data.course}</div> 
                                    <div>Група: ${data.group}</div>`;
                                scheduleTable.appendChild(headerTr);
                                data.secondweek.forEach(function(elem) 
                                {
                                    let tr = document.createElement('tr');
                                    tr.innerHTML = 
                                        `<td>${elem.day}</td><td>${elem.pair}</td>
                                        <td>${elem.start}</td><td>${elem.end}</td>
                                        <td>${elem.subject}</td><td>${elem.room}</td>
                                        <td>${elem.group}</td><td>${elem.teacher}</td>`;
                                    schedule.appendChild(tr);
                                });
                            }
                        }
                        $('#formdata')[0].reset();
                        console.log(mean);
                        mean = undefined;
				    } 
                })
            console.log(grouppaid);
            console.log(mean);
        });
    });
});
});