import { addressToCord, CordToAddress } from "../../services/geoCode";
import { MTableEditField } from "@material-table/core";
export default function EditAddressComp(props) {

    const handleChange = (e) => {
        props.onChange(e)
        props.rowData[props.columnDef.field] = e;
        props.onRowDataChange(props.rowData)
        if (['lat', 'lng'].includes(props.columnDef.field))
            getAddress(props.rowData.lat, props.rowData.lng)
        if (['city', 'street', 'number'].includes(props.columnDef.field))
            getGeoCord(props.rowData.city, props.rowData.street, props.rowData.number)
    }

    function getGeoCord(city, street, number) {
        if (city && city !== "" && street && street !== "") {

            addressToCord(city, street, number)
                .then(geo => {
                    if (geo?.partAddress) {
                        props.rowData['geoAddress'] = `${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`;
                        if (geo.partAddress.city.includes(city) && geo.partAddress.street.includes(street)) {
                            props.rowData.lat = geo.geometry.lat();
                            props.rowData.lng = geo.geometry.lng();
                        }
                        props.onRowDataChange(props.rowData)
                    }

                })
                .catch(err => {
                    props.rowData['geoAddress'] = "כתובת לא מזוהה";
                    props.onRowDataChange(props.rowData)

                })
        }
        // else (console.log(city, street, number))

    }





    //Callback Func to set address from lat&lng cord
    function getAddress(lat, lng) {
        if (lat && lat !== "" && lng && lng !== "") {
            CordToAddress(lat, lng)
                .then(geo => {
                    if ('partAddress' in geo) {
                        props.rowData.city = geo.partAddress.city;
                        props.rowData.street = geo.partAddress.street;
                        props.rowData.number = geo.partAddress.number;
                        props.rowData['geoAddress'] = `${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`
                        props.onRowDataChange(props.rowData)
                    }

                })
                .catch(err => {
                    props.rowData['geoAddress'] = "לא זוהתה כתובת קואורדינטות"
                    props.onRowDataChange(props.rowData)
                })
        }
    }




    // {/* {(props.columnDef.field === 'city') && props.rowData.geoAddress && <p style={{ position: "absolute" }}><i>{props.rowData.geoAddress}</i></p>} */}
    return (

        <MTableEditField
            {...props}
            className={(props.columnDef.field === 'city' && props.rowData.geoAddress) ? 'geoAdress' : undefined}
            onChange={handleChange}
            helperText={(props.columnDef.field !== 'city') ? props.helperText :
                props.rowData.geoAddress ? props.rowData.geoAddress : props.helperText}
        />
    )
}
