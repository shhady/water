import Table from '../../components/Table/Table'
import { useContext, useEffect, useState, useRef, useMemo } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi';


/**
 * A table that displays the authorisation data.
 * @param data - The data to display in the table.
 * @returns None
 */
function AuthoriserTable({ data }) {

    const { userInfo, accessToken, customerNames, setCustomersNames } = useContext(MyContext);

    const hideCustomerColumn = useMemo(() => { return !data?.some(({ customer_id }) => customer_id !== userInfo?.customer_id) }, [userInfo, data])

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


    useEffect(() => {

        //if no customer names fetch customer names
        if (accessToken && !customerNames)
            FatchDataApi('customer_names', 'GET', accessToken, setCustomersNames);

    }, [accessToken])




    const title = 'גורמים מורשים'
    const columns = {
        authoriser: 'גורם מורשה',
        customer_id: 'לקוח',
        count_alerts: 'כמות',
        event_status: 'אירוע',
        sum_value: 'ליטרים'
    };
    const options = {
        columnsButton: hideCustomerColumn,
        hidden: { customer_id: hideCustomerColumn },
        noCover: true,
        showTitle: true,
        edit: false,
        lookup: {
            event_status: { null: 'ללא אירוע', Open: 'פתוח', Closed: 'סגור' },
            customer_id: customerNamesLookup
        },
        customSort: {
            customer_id: (a, b) => a.customer_id - b.customer_id,
        },
        renderSummaryRow: ({ column, data }) => {
            switch (column.field) {
                
                case "authoriser":
                    return {
                        value: 'סה"כ',
                        style: { fontSize: '1.2rem', color: 'var(--green)', background: 'var(--blue)', fontWeight: 'bold', textAlign: 'center' }
                    }
                case "sum_value":
                    return {
                        value: data.reduce((agg, row) => agg + row.sum_value, 0) + " ליטרים",
                        style: { fontSize: '1.2rem', color: 'var(--green)', background: 'var(--blue)', fontWeight: 'bold', textAlign: 'start' }
                    }
                case "count_alerts":
                    return {
                        value: data.reduce((agg, row) => agg + row.count_alerts, 0) + " התראות זרימת מים",
                        style: { fontSize: '1.2rem', color: 'var(--green)', background: 'var(--blue)', fontWeight: 'bold', textAlign: 'start' }
                    }
                default:
                    return { style: { background: 'var(--blue)' } }
            }

        }
    }
    return (
        <> {(customerNames) &&
            <Table
                indexKey="key"
                title={title}
                columns={columns}
                options={options}
                data={data}

            />
        }
        </>
    )
}

export default AuthoriserTable