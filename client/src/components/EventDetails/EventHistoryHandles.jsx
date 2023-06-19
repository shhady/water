import { useEffect, useContext, useState } from "react";
import { MyContext } from "../../services/MyProvider";
import FatchDataApi from '../../services/FatchDataApi';
import HandleHistoryRow from "./HandleHistoryRow/HandleHistoryRow";
import PropTypes from 'prop-types';
import './eventHistoryHandles.css';
import Table from "../Table/Table";
import { Avatar } from "@material-ui/core";

export default function EventHistoryHandles({ event_id, invoke, detailsInside = true }) {

    const { accessToken } = useContext(MyContext);
    const [handlesHistory, setHandlesHistory] = useState();

    useEffect(() => {
        // clean up controller
        let isSubscribed = true;
        const loadHistoryResponse = (data) => {
            if (isSubscribed) setHandlesHistory(data.handlings);
        }
        accessToken && FatchDataApi(`history_handlings/${event_id}`, 'GET', accessToken, loadHistoryResponse);
        // remove callback subscription 
        return () => { isSubscribed = false }
    }, [event_id, invoke])

    // showDetails=true,setFucusedHandle
    const handleHistoryRows =handlesHistory?.map((handle, idx) =>
                <HandleHistoryRow handle={handle} key={idx} showDetails={(detailsInside)}/>)


    return (
        <>
            {(detailsInside) ?
                <div className="eventHistory">
                    <h4>טיפולים לאירוע</h4>
                    <div className="eventHistoryGridHeader">
                        <h5>משימה</h5 >
                        <h5>מטפל</h5 >
                        <h5>תאריך</h5 >
                        <h5>טיפול</h5 >
                    </div>
                    <hr style={{ margin: "0 1rem" }} />
                    <div className="eventHistoryGridWraper">
                        {handleHistoryRows}
                    </div>
                </div>
                :
                <Table                    
                    indexKey={"handle_id"}
                    title={"היסטוריית טיפולים לאירוע"}
                    options={{
                        
                        style:{background:'var(--very-light-gray)'},
                        toolbar:false,
                        search: false,
                        showTitle:true,
                        noCover:true,
                        constPageSize: 5,
                        padding:'dense',
                        lookup: { status: { 0: 'לא בוצע', 1: 'בוצע' }, send_mail: { false: 'לא נשלח', true: 'נשלח' } },
                        render: {
                            handler_user: rowData =>
                                <span style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>
                                    {rowData.handler_user && <Avatar src={rowData.handler_user_url} alt={rowData.handler_user} />}
                                    {rowData.handler_user}
                                </span>
                            ,
                            assigning_user: rowData =>
                                <span style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>
                                    {rowData.assigning_user && <Avatar src={rowData.assigning_user_url} alt={rowData.assigning_user} />}
                                    {rowData.assigning_user}
                                </span>
                        },

                    }}

                    data={handlesHistory}
                    columns={{
                        handle_type: "משימה",
                        handler_user: "מטפל",
                        assigning_user: "מפנה",
                        authoriser: "גורם מאשר",
                        datetime_updated: "עודכן",
                        send_mail: "מייל",
                        comment: "הערות",
                        status: "טיפול",
                    }}
                />

            }

        </>
    )
}

EventHistoryHandles.propTypes = {
    event_id: PropTypes.number,
    invoke: PropTypes.number
}
