import  { useState } from 'react'
import MyNotification from '../../services/MyNotification'
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../../services/firebase'
import { addressToCord, CordToAddress } from '../../services/geoCode';



function AddHydrant({ handleAddHydrant, setOpenAdd }) {

    const [phone, setPhone] = useState("");
    const [sim, setSim] = useState("");
    // const [status, setStatus] = useState(0);

    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [geoAddress, setGeoAddress] = useState("")

    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();


        if (city && street && number!==undefined && lat && lng) {
            handleAddHydrant({ phone: phone, sim: sim, city: city, street: street, number: number, lat: lat, lng: lng, picture_url: pictureUrl });
            setOpenAdd(false);
        } else {
            MyNotification('error', 'חובה למלא את כל השדות');
        }
    }

    //Callback Func to set GeoCode from Human address 
    function getGeoCord(city, street, number) {
        if (city !== "" && street !== "") {
            addressToCord(city, street, number)
                .then(geo => {
                    if (geo?.partAddress) {
                        setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
                        if (geo.partAddress.city.includes(city) && geo.partAddress.street.includes(street)) {
                            setLat(geo.geometry.lat)
                            setLng(geo.geometry.lng)
                        }
                    }
                    else
                        setGeoAddress("כתובת לא זוהתה")
                })
                .catch(err => { setGeoAddress("כתובת לא זוהתה") })
        }
    }
    //Callback Func to set address from lat&lng cord
    function getAddress(lat, lng) {
        if (lat !== "" && lng !== "") {
            CordToAddress(lat, lng)
                .then(geo => {
                    if ('partAddress' in geo) {
                        setCity(geo.partAddress.city)
                        setStreet(geo.partAddress.street)
                        setNumber(geo.partAddress.number)
                        setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
                    }
                    else
                        setGeoAddress("לא זוהתה כתובת בקורדינטות")
                })
                .catch(err => { setGeoAddress("לא זוהתה כתובת בקורדינטות") })
        }
    }
    /******************************************
     handle update Input Address fields:
    ******************************************/


    //handle update Input City field:
    const handleChangeCity = (event) => {
        setCity(event.target.value);
        getGeoCord(event.target.value, street, number);
    }
    //handle update Input Street field:
    const handleChangeStreet = (event) => {
        setStreet(event.target.value);
        getGeoCord(city, event.target.value, number);
    }
    //handle update Input Number field:
    const handleChangeNumber = (event) => {
        setNumber(event.target.value);
        getGeoCord(city, street, event.target.value);
    }


    //handle update Input lat field:
    const handleChangeLat = (event) => {
        setLat(event.target.value);
        getAddress(event.target.value, lng);
    }
    //handle update Input lng field:
    const handleChangeLng = (event) => {
        setLng(event.target.value);
        getAddress(lat, event.target.value);
    }


    // Set Cordenat & address by Browser GeoLocation
    const getCurrentLocation = (e) => {
        e.preventDefault()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                getAddress(position.coords.latitude, position.coords.longitude)
            }, (err) => {
                if (err.code === 1)
                    MyNotification('darkblue', "שגיאת מיקום", `לא ניתנו הראשות גישה למיקום`)
                else
                    MyNotification('darkblue', "שגיאת מיקום", `${err.message}: ${err.code}`)
            });
        }

    }


    return (
        <>
            <div className="background-block-dark">
                <div className="options-content window">
                    <header>
                        <CloseIcon onClick={() => setOpenAdd(false)} className="materialClose" />
                        <h3 className='title'>יצירת ברז כיבוי אש</h3>
                    </header>
                    <form className="edit-form" onSubmit={e => handleSubmit(e)}>
                        <legend>פרטי ברז כיבוי אש</legend>
                       
                        <fieldset>
                            <label htmlFor="phone">פלאפון:</label>
                            <input type="tel" id="phone" value={phone}  placeholder="מספר פלאפון" pattern="^[0][5][0-9][\-]?[0-9]{7}$" onChange={e => setPhone(e.target.value)} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="sim">סים:</label>
                            <input type="number" id="sim" value={sim}  placeholder="מספר סים" onChange={e => setSim(e.target.value)} />
                        </fieldset>

                        <legend>מיקום ברז כיבוי אש</legend>
                        <button onClick={e => getCurrentLocation(e)}>טעינת מיקום נוכחי</button>

                        <fieldset>
                            <label htmlFor="city">עיר:</label>
                            <input type="text" id="city" value={city} required
                                placeholder="עיר"
                                onChange={handleChangeCity} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="street">רחוב:</label>
                            <input type="text" id="street" value={street} required
                                placeholder="רחוב"
                                onChange={handleChangeStreet} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="number">מספר:</label>
                            <input type="number" id="number" value={number} required
                                placeholder="מספר"
                                onChange={handleChangeNumber} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="lat">קו רוחב:</label>
                            <input type="number" id="lat"
                                value={lat}
                                required placeholder="קו רוחב"
                                onChange={handleChangeLat}
                            />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="lng">קו אורך:</label>
                            <input type="number" id="lng"
                                value={lng}
                                required placeholder="קו אורך"
                                onChange={handleChangeLng}
                            />

                        </fieldset>

                        {(geoAddress !== "") && <i>{geoAddress}</i>}

                        <fieldset>
                            <label htmlFor='pictureUrl'>העלאת תמונה:&nbsp;
                                {(pictureUrl) ?
                                    <img src={pictureUrl} className='hydrantImage' alt='תמונת פרופיל' /> :
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                }
                            </label>
                            <input type="file" id='pictureUrl' name='pictureUrl' accept="image/*"
                                onChange={(e) => uploadImage(e.target.files[0], "hydrants", setPictureUrl)} >
                            </input>
                        </fieldset>




                        <button type="submit">שמירה</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddHydrant