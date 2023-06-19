import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { MyContext } from '../../../services/MyProvider';
import FatchDataApi from '../../../services/FatchDataApi';
import HandleHistoryDetails from './HandleHistoryDetails';

export default function HandleHistoryRow({ handle,showDetails=true }) {

    return (

        <label title="פרטים נוספים" htmlFor={`handle_${handle?.handle_id}`} name="handleDetails" >
            {/* checkbox for Hide /Show User Details */}
            <input
                name="handleDetails"
                type='radio'
                style={{ 'display': 'none' }}
                className='showInfo'
                id={`handle_${handle?.handle_id}`} />
            <div className="HandleHistoryRow">
                <p>{(handle.handle_type) ? handle.handle_type : "סגירה ידנית"}</p>
                {(handle?.authoriser) ? <p>{handle.assigning_user}</p> : <p>{handle.handler_user}</p>}
                <p>{handle?.datetime_updated}</p>
                <p>{(handle?.status) ? "בוצע" : "לא בוצע"}</p>
                {showDetails &&< HandleHistoryDetails handle={handle} />}
            </div>

        </label>

    )
}

HandleHistoryRow.propTypes = {
    handle: PropTypes.object
};
