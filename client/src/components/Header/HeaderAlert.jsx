import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../services/MyProvider';
import './headerAlert.css'

export default function HeaderAlert() {


    const { eventsArr, setFocusedEvent, isReversFlow, isMuted  } = useContext(MyContext)
    const [showAlert, SetShowAlert] = useState(false)
    const openRevers = useMemo(() => eventsArr?.find(event => (event.trigger_id === 2 && event.status === 1)), [eventsArr])
    const redirect = useNavigate();



    useEffect(() => {
        if (openRevers)
            SetShowAlert(true)
        else
            SetShowAlert(false)

    }, [openRevers])

    return (
        <>
            <div className='topLine' style={(showAlert || isReversFlow || isMuted) ? { backgroundColor: 'var(--red)' } : { backgroundColor: 'var(--green)' }} />
            {(showAlert) &&
                <div className='header-alert-wrapper'>
                    <div className='header-alert'
                    onClick={() => {
                        redirect('/');
                        setFocusedEvent(openRevers)
                    }}
                    >
                        <p>טיפול באירוע</p>
                        <h1>זרימה הפוכה טרם הושלם !</h1>
                    </div>
                </div>
            }
            {(showAlert || isReversFlow || isMuted) && <div className='footer-alert'/>}
        </>
    )
}
