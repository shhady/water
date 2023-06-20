import Table from '../../components/Table/Table'

import tableIcons from '../../components/Table/MaterialTableIcons';
import TrigIcon from '../../components/TrigIcon/TrigIcon'
import './eventsTable.css'
import { EVENTS_TITLES } from '../../services/MyProvider'
import EventDetails from '../../components/EventDetails/EventDetails'
import { useContext, useEffect, useState, useRef, useMemo } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay, faCalendarWeek, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faCalendarTimes } from '@fortawesome/free-regular-svg-icons'
import dateSorting from '../../services/dateSorting';


function EventsTable({ eventsArr, filtering }) {

    const { accessToken, hydrantArr, setHydrantArr, customerNames, setCustomersNames ,userInfo} = useContext(MyContext);
    const [dateFilter, setDateFilter] = useState(Infinity)
    const selectedRow = useRef(null);
    const customerNamesLookup = useMemo(() => {
        return customerNames?.reduce((allCustomers, customer) => {
            allCustomers[customer.customer_id] =
                <span style={{display: 'flex', alignItems: 'center' }}>
                    {(customer.logo_url) && <img className='inRowLogo' src={customer.logo_url} alt={customer.customer_name} />}
                    {customer.customer_name}
                </span>

                 return allCustomers
        }, {})
    }, [customerNames]);
    const hideCustomerColumn =useMemo(()=>{return !eventsArr?.some(({customer_id})=>customer_id !== userInfo.customer_id)},[userInfo,eventsArr])


    useEffect(() => {
        if (accessToken && !hydrantArr)
            FatchDataApi('hydrants', 'GET', accessToken, setHydrantArr)
        //if no customer names fetch customer names
        if (accessToken && !customerNames)
            FatchDataApi('customer_names', 'GET', accessToken, setCustomersNames);

    }, [ accessToken])


    const title = "אירועים";
    const eventsCols = {
        event_id: 'מספר אירוע',
        trigger_id: 'סוג',
        datetime_created: 'נפתח',
        datetime_updated: 'עודכן',
        value: 'כמות',
        hydrant_id: 'כתובת',
        status: 'סטטוס',
        customer_id: 'לקוח',
    };
    const options = {
        columnsButton: true,
        hidden: { customer_id: hideCustomerColumn },
        edit: false,
        filtering: filtering ? true : false,
        customSort: {
            datetime_created: (a, b) => dateSorting(a.datetime_created, b.datetime_created),
            datetime_updated: (a, b) => dateSorting(a.datetime_updated, b.datetime_updated),
            customer_id: (a, b) => a.customer_id - b.customer_id,

        },
        filter: { event_id: false },
        lookup: {
            status: { 0: 'חדש', 1: 'בטיפול', 2: 'סגור' },
            customer_id: customerNamesLookup,
        },
        editOptions: {
            disableCols: ['customer_id', 'event_id', 'datetime_created', 'datetime_updated', 'hydrant_id', 'alert_id']
        },
        render: {
            value: rowData => rowData.value_type ? rowData.value + '  ' + rowData.value_type : 'ללא',
            trigger_id: rowData =>
                <span className={`eventTrig${rowData.trigger_id}`}>
                    <TrigIcon white={(rowData.tableData?.showDetailPanel) ? false : true} style={{ zIndex: "5", right: "calc(var(--Icon-Bar-Offset) - 10px) ", position: "absolute" }} trigger={rowData.trigger_id} />
                    {EVENTS_TITLES[`trig${rowData.trigger_id}`]}
                </span>,
            hydrant_id: rowData => {
                const hydrant = hydrantArr?.find(hydrant => hydrant.hydrant_id === rowData.hydrant_id)
                return ((hydrant) ? <p>{hydrant.street}&nbsp;{hydrant.number}, {hydrant.city}</p> : <p>-</p>)
            },
        },
        onRowClick: (event, rowData, togglePanel) => {
            togglePanel();
        },
        rowStyle: (rowData) => {
            return ({
                direction: 'rtl',
                position: "relative",
                fontSize: "1.2rem",
                color: "var(--textColor)",
                backgroundColor: (selectedRow.current === rowData.tableData.id) ? 'var(--light-gray)' : 'inherit'
            })
        },
        detailPanel:
            [
                (rowData) => {
                    selectedRow.current = (rowData.tableData.showDetailPanel) ? rowData.tableData.id : null;
                    return ({
                        icon: tableIcons.DetailPanel,
                        tooltip: (rowData.status !== 2) ? 'טיפול באירוע' : 'פרטי טיפול',
                        render: () =>
                            <>
                                <p className='hydrantId' style={{ height: '100%' }}>{rowData.hydrant_id}</p>
                                <EventDetails event={rowData} className={`TableHandleWrapper`} showInfo={false} disabledFocus={true} />
                            </>

                    })
                }
            ]


    };


    return (
        <>
            {(customerNames) && <Table
                indexKey="event_id"
                title={title}
                columns={eventsCols}
                options={options}

                data={eventsArr?.filter(event => dateFilter > Date.now() / 1000 - event.time_stamp).sort((a, b) => a.status - b.status)}
                actions={[
                    {
                        icon: () =>
                            <div style={{ color: (dateFilter === 86400) ? 'var(--green)' : '' }}>
                                <FontAwesomeIcon icon={faCalendarDay} />
                                <p>יממה</p>
                            </div>,
                        tooltip: 'הצגה יומית',
                        isFreeAction: true,
                        onClick: () => { setDateFilter(86400) }

                    },
                    {
                        icon: () =>
                            <div style={{ color: (dateFilter === 604800) ? 'var(--green)' : '' }}>
                                <FontAwesomeIcon icon={faCalendarWeek} />
                                <p>שבוע</p>
                            </div>,
                        tooltip: 'הצגה שבועית',
                        isFreeAction: true,
                        onClick: () => { setDateFilter(604800) }

                    },
                    {
                        icon: () =>
                            <div style={{ color: (dateFilter === 2629743) ? 'var(--green)' : '' }}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <p>חודש</p>
                            </div>,

                        tooltip: 'הצגה חודשית',
                        isFreeAction: true,
                        onClick: () => { setDateFilter(2629743) }

                    },
                    {
                        icon: () =>
                            <div style={{ color: (dateFilter === 31556926) ? 'var(--green)' : '' }}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <p>שנה</p>
                            </div>,
                        tooltip: 'הצגה שנתית',
                        isFreeAction: true,
                        onClick: () => { setDateFilter(31556926) }

                    },
                    {
                        icon: () =>
                            <div style={{ color: (dateFilter === Infinity) ? 'var(--green)' : '' }}>
                                <FontAwesomeIcon icon={faCalendarTimes} />
                                <p>הכל</p>
                            </div>,
                        tooltip: 'ללא סינון תאריך',
                        isFreeAction: true,
                        onClick: () => { setDateFilter(Infinity) }

                    },
                ]}

            />}
        </>

    )
}

export default EventsTable