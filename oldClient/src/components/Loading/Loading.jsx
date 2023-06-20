/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import "./loading.css"

export default function Loading({position='fixed'}) {
    return (
        <div className="lds-wrapper" style={{position:position}}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            <h3 >טוען..</h3>
            </div>
        </div>

    )
}
