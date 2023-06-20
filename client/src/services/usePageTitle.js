import  {useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import {MyContext} from './MyProvider';

/**
 * Sets the page title to the given title.       
 * @param {string} title - the title to set the page to.       
 * @returns None       
 */
function usePageTitle(title) {
    const {userInfo} = useContext(MyContext);
    const location = useLocation();

    useEffect(() => {
      if(userInfo) {
        document.title = `I-Jet | ${userInfo.customer_name} - ${title}`;
      }
    }, [location, userInfo]); 

}

export default usePageTitle