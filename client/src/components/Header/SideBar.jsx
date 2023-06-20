import React, { useContext, useEffect, useRef } from 'react'
import MenuIcon from '../../assets/icons/menu-icon.svg'
import Menu from './Menu'
import { MyContext } from '../../services/MyProvider';
import { useComponentVisible } from '../../services/UseComponentVisible';


export default function SideBar() {

    const {
        ref,
        isComponentVisible,
        handleClick
    } = useComponentVisible('', 'slide-in');

    const { userInfo } = useContext(MyContext)
    const sidebar = useRef();

    useEffect(() => {
        if (isComponentVisible === 'slide-in') {
            sidebar.current.style.zIndex = 12
            ref.current.style.zIndex = 11
        }
        else {
            setTimeout(() => {
                if (ref.current)
                    ref.current.style.zIndex = 'inherit';
                if (sidebar.current)
                    sidebar.current.style.zIndex = 5
            }, 400)
        }

    }, [isComponentVisible])


    return (
        <>
            <div ref={sidebar} className="sideBar">
                {userInfo && <div className="top">
                    <img src={MenuIcon} alt="תפריט" className="menu-icon" onClickCapture={handleClick} />
                </div>}
            </div>
            <Menu refer={ref} active={isComponentVisible} handleClick={handleClick} />
        </>
    )
}
