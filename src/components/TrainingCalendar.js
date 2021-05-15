import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function TrainingCalendar() {
    const localizer = momentLocalizer(moment);
    const views = ['month', 'week', 'day', 'agenda'];
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then((data) => {
            setEvents(
                data.map((item) => ({
                    start: moment.utc(item.date).toDate(),
                    title: `${item.activity} / ${item.customer.firstname} ${item.customer.lastname}`,
                    end: moment.utc(item.date).add(item.duration, 'minutes').toDate()
                }))
            );
        })
        .catch((err) => console.error(err));
    };

    return(
        <div>
           <Calendar
            localizer={localizer}
            events={events}
            views={views}
            style={{ height: 500 }}
        />
        </div>
    )
}

export default TrainingCalendar;