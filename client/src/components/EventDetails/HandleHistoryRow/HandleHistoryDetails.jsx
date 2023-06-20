import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { MyContext } from '../../../services/MyProvider';
import FatchDataApi from '../../../services/FatchDataApi';

export default function HandleHistoryDetails({ handle, className = 'handleInfoBox' }) {

    return (

        <div className={className}>
            <div className='handleInfoBoxGrid'>
                {handle?.authoriser &&
                    <>
                        <p>גורם מורשה:</p>
                        <p>{handle?.authoriser}</p>
                    </>
                }
                <p>מפנה:&nbsp;
                    {handle.assigning_user}</p>
                    {handle?.comment && <p>הערות:&nbsp;
                    {handle?.comment}</p>}
            </div>
        </div>


    )
}

HandleHistoryDetails.propTypes = {
    handle: PropTypes.object,
    user: PropTypes.object,
    className: PropTypes?.string,
};
