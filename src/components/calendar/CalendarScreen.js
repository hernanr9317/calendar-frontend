import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from './../ui/Navbar';
import { messages } from './../helpers/calendar-messages-es';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from './../ui/AddNewFab';
import { DeleteEventFab } from './../ui/DeleteEventFab';
import { eventClearActiveEvent } from './../../actions/events';

moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewCahnge = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
       dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        return {
            className: "card-Calendar"
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <div className="container-fluid">

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewCahnge }
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                 (activeEvent) && <DeleteEventFab /> 
            }
              
            <CalendarModal />

            </div>
        </div>
    )
}
