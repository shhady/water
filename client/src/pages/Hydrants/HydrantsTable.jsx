import { useContext, useMemo, useEffect } from 'react'
import dateSorting from '../../services/dateSorting'
import Table from '../../components/Table/Table'
import MyNotification from '../../services/MyNotification'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi';
import EditAddressComp from './EditAddressComp'
import UploadFile from '../../components/buttons/UploadFile';
import { MTableEditField } from "@material-table/core";


function HydrantsTable({ handleAddHydrant }) {

    const { hydrantArr, setHydrantArr, accessToken, customerNames, setCustomersNames, userInfo } = useContext(MyContext);
    const customerNamesLookup = useMemo(() => {
        return customerNames?.reduce((allCustomers, customer) => {
            allCustomers[customer.customer_id] =
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    {(customer.logo_url) && <img className='inRowLogo' src={customer.logo_url} alt={customer.customer_name} />}
                    {customer.customer_name}
                </span>

            return allCustomers
        }, {})
    }, [customerNames]);
    const hideCustomerColumn = useMemo(() => { return !hydrantArr?.some(({ customer_id }) => customer_id !== userInfo?.customer_id) }, [hydrantArr, userInfo])

    useEffect(() => {

        //if no customer names fetch customer names
        if (accessToken && !customerNames)
            FatchDataApi('customer_names', 'GET', accessToken, setCustomersNames);

    }, [ accessToken])

    const title = 'ברזי כיבוי אש';
    const hydrantCols = {
        phone: 'מספר פלאפון',
        sim: 'מספר סים',
        customer_id: 'לקוח',
        status: 'סטטוס',
        date_installed: 'תאריך התקנה',
        city: 'עיר',
        street: 'רחוב',
        number: 'מספר',
        lat: 'קו רוחב',
        lng: 'קו אורך',
        //  picture_url: 'תמונה'
    };
    const options = {
        columnsButton: true,
        hidden: { customer_id: hideCustomerColumn },
        // edit: true,
        filtering: true,
        lookup: {
            status: { 1: 'פעיל', 0: 'לא פעיל' },
            customer_id: customerNamesLookup
        },
        initialEditValue: { status: 0 },
        customSort: {
            date_installed: (a, b) => dateSorting(a.date_installed, b.date_installed),
            customer_id: (a, b) => a.customer_id - b.customer_id,
        },
        editOptions: {
            ...((userInfo?.mng_access_list?.hydrantsEdit) && { delete: handleDelete, update: handleUpdate, add: handleAdd }),
            disableCols: ['hydrant_id', 'date_installed', 'status', 'customer_id'],
            editableOnUpdate: ['status', 'customer_id'],
            customEditComponent: {
                city: EditAddressComp,
                street: EditAddressComp,
                number: EditAddressComp,
                lat: EditAddressComp,
                lng: EditAddressComp,
                status: (props) => <MTableEditField {...props} disabled={!props.rowData.status} />,
                phone: (props) => <><p className="hydrantId hydrant-Id-Height">{props.rowData.hydrant_id}</p><MTableEditField {...props} /></>,
            },
        },
        render: {
            phone: rowData =>
                <>
                    <p className="hydrantId hydrant-Id-Height">{rowData.hydrant_id}</p>
                    <>{rowData.phone}&nbsp;</>
                </>,
        },
        customValidate: {
            phone: rowData => (Number(rowData.status) === 0) || (Number(rowData.status) === 1 && rowData.phone && rowData.phone !== "") ?
                { isValid: true, helperText: 'טלפון' } : { isValid: false, helperText: 'שדה חובה בהידרנט פעיל' },
            sim: () => { return { isValid: true, helperText: 'סים' } },
            number: () => { return { isValid: true, helperText: 'מספר' } },
            city: rowData => (rowData.city) ? { isValid: true, helperText: 'עיר' } : { isValid: false, helperText: 'שדה חובה' },
            street: rowData => (rowData.street) ? { isValid: true, helperText: 'רחוב' } : { isValid: false, helperText: 'שדה חובה' },
            lat: rowData => (rowData.lat) ? { isValid: true, helperText: 'קו רוחב' } : { isValid: false, helperText: 'שדה חובה' },
            lng: rowData => (rowData.lng) ? { isValid: true, helperText: 'קו אורך' } : { isValid: false, helperText: 'שדה חובה' },
        },
        type: { phone: 'numeric', sim: 'numeric', number: 'numeric', lat: 'numeric', lng: 'numeric' }

    };

    function handleAdd(newData) {

        if (newData.city && newData.street && newData.lat && newData.lng) {
            handleAddHydrant({ phone: newData.phone, sim: newData.sim, status: newData.status, city: newData.city, street: newData.street, number: newData.number, lat: newData.lat, lng: newData.lng, picture_url: newData.picture_url });
            return true
        }
        else {
            MyNotification("darkblue", 'שגיאה', 'שדות חובה חסרים');
            return false
        }
    }

    function handleUpdate(newData) {

        function updateHydrant(response) {
            setHydrantArr([...hydrantArr.map(hydrant => (hydrant.hydrant_id !== response.updatedHydrant.hydrant_id) ? hydrant : response.updatedHydrant)]);
            MyNotification('light', "עדכון ברז כיבוי אש", `ברז כיבוי אש ${response.updatedHydrant.hydrant_id} עודכן בהצלחה`);
        }
        FatchDataApi('hydrants/update', 'PUT', accessToken, updateHydrant, { payload: newData, errorMsgTitle: "שגיאה בעדכון ברז כיבוי אש", onReject: () => { setHydrantArr([...hydrantArr]) } });
        return true

    }

    function handleDelete(oldData) {
        function deleteHydrant(responseHydrant) {
            const tempData = hydrantArr.filter(hydrant => hydrant.hydrant_id !== responseHydrant.deletedHydrant.hydrant_id)
            setHydrantArr(tempData);
            MyNotification('light', 'מחיקת ברז כיבוי אש', `ברז כיבוי ${responseHydrant.deletedHydrant.hydrant_id} הוסר בהצלחה`);
        }
        FatchDataApi('hydrants/delete', 'DELETE', accessToken, deleteHydrant, { payload: { "hydrant_id": oldData.hydrant_id }, errorMsgTitle: "שגיאה במחיקת ברז כיבוי אש", onReject: () => { setHydrantArr([...hydrantArr]) } });
    }

    function handleSendCSV(resposne) {
        const newHydrants = resposne.response_list.filter((item) => item.newHydrant).map((item) => item.newHydrant)
        const failed = resposne.response_list.filter((item) => item.hydrant)
        setHydrantArr(prev => [...newHydrants, ...prev])
        if (newHydrants.length > 0)
            if (newHydrants.length === 1)
                MyNotification("light", 'הוספת ברזי כיבוי אש מקובץ', `ברז כיבוי אש ${newHydrants[0].hydrant_id} נוסף בהצלחה`);
            else
                MyNotification("light", 'הוספת ברזי כיבוי אש מקובץ', `נוספו ${newHydrants.length} ברזי כיבוי אש`);

        if (failed.length > 0) {
            MyNotification("darkblue", 'בעיה בהוספת ברזי כיבוי אש מקובץ', failed.map((item, idx) => <div>{item.msg}<br />ברז כיבוי אש:{item.hydrant.hydrant_id}<br /></div>));

        }




    }




    return (
        <>{(customerNames) &&
            <Table
                indexKey="hydrant_id"
                title={title}
                columns={hydrantCols}
                options={options}
                data={hydrantArr}
                actions={[
                    
                    (userInfo?.mng_access_list?.hydrantsEdit) &&{
                        icon: () => <UploadFile target={'hydrants/UploadCsv'} callback={handleSendCSV} successCodes={[201, 207]} />,
                        tooltip: 'העלת קובץ אקסל',
                        isFreeAction: true,
                    }
                ]}
            />}
        </>
    )
}

export default HydrantsTable