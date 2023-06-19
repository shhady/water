// import PropTypes from 'prop-types'
import { useState, useEffect, createRef, useMemo } from 'react'
import MaterialTable from "@material-table/core";
import tableIcons from "./MaterialTableIcons";
import { ExportCsv } from '@material-table/exporters'
import './table.css'



// the props to pass to the component are the following: 
// 1. title - string - name of the page and the table, also used as file name when exporting.
// 2. data - an array of objects that contain the data to display.
// 3. columns -an object with key-value pairs, where the key is the key of the value to be displayed from the data prop
//    and the value is the displayed name of the column.
// 4. options - an object containing key-value pairs where the key is the name of the option, and the value is a boolean.
//    available options:
//                      edit - false by default. set to true if required
//                      lookup - when the column value is a lookup of the value to be displayed, pass the column key as key, and the lookup as an object with key-value pairs.
//                      editOptions - an object containing the callback functions that manipulate data. the keis are: "add", "edit", "delete".
//                      disableColumns - an array of column keys that will not be able to be added or edited
//                      initialEditValue - Initial value on add new row
//                      render - Render a custom node for cell. Parameter is rowData and return value must be ReactElement
//                      type - Data type: 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
//                      cellStyle -Cell cellStyle
//                      headerStyle -Header cell style for all headers




function Table({ title, data, columns, options, indexKey, isLoading = true, actions = [] }) {

    const tableRef = createRef(null)
    const [loading, setloading] = useState(isLoading)
    const [tableOptions, setTableOptions] = useState(
        {
            columnsButton: options?.columnsButton ? true : false,
            search: options?.search,
            sorting: true,
            toolbar: ('toolbar' in options) ? options.toolbar : true,
            toolbarButtonAlignment: 'left',
            filtering: (options?.filtering) ? true : false,
            detailPanelColumnAlignment: 'right',
            padding: (options?.padding) ? options.padding : 'default',
            detailPanelType: "single",
            idSynonym: indexKey,
            showTitle: options.showTitle ? true : false,
            addRowPosition: "first",
            exportMenu: [{
                label: 'יצא כקובץ אקסל',
                exportFunc: (displayColumns, data) => ExportCsv(displayColumns, data, title)
            }],
            actionsColumnIndex: -1,
            exportAllData: true,
            paging: (options?.constPageSize && data?.length <= options.constPageSize) ? false : true,
            pageSizeOptions: (options?.constPageSize) ? [options.constPageSize] : [0, 10, 50, 100],
            pageSize: (options?.constPageSize) ? options.constPageSize : 10,
            emptyRowsWhenPaging: false,
            maxBodyHeight: 'calc(100vh - 155px - var(--nav-height) - var(--Screen-Header-Height))',
            tableWidth: 'variable',
            headerStyle: {
                direction: 'rtl',
                position: 'sticky',
                fontFamily: 'Assistant',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                zIndex: options?.noCover ? 1 : 2,
                top: 0,
                background: (options?.constPageSize) ? 'inherit' : 'var(--white)',
            },
            rowStyle:
                (options?.rowStyle) ? options.rowStyle :
                    {
                        direction: 'rtl',
                        position: "relative",
                        fontSize: "1.2rem",
                        color: "var(--textColor)",
                    },
            searchFieldStyle: { flexDirection: 'row-reverse' },
            filterRowStyle: {
                position: 'sticky',
                zIndex: 2,
                background: 'var(--white)',
                top: 40,
                height: '40px',
            },
            filterCellStyle: {
                padding: '0 16px 4px 50px',
            }

        })

    useEffect(() => {
        setTableOptions(prev => { return { ...prev, paging: (options?.constPageSize && data?.length <= options.constPageSize) ? false : true } })
    }, [data?.length])

    // on component load memoize column rules
    const [displayColumns, setDisplayColumns] = useState(() => {
        let temp = [];
        for (const column in columns) {
            temp.push({
                title: columns[column],
                field: column,
                initialEditValue: (options && 'initialEditValue' in options) ? options.initialEditValue[column] : null,
                lookup: (options && 'lookup' in options) ? options.lookup[column] : null,
                filtering: (options && 'filter' in options) ? options.filter[column] : true,
                render: (options && 'render' in options) ? options.render[column] : null,
                type: (options && 'type' in options) ? options.type[column] : null,
                cellStyle: { textAlign: 'start' },
                customSort: (options && 'customSort' in options) ? options.customSort[column] : null,
                validate: (options && 'customValidate' in options) ? options.customValidate[column] : null,
                editable: (options?.editOptions?.disableCols?.includes(column)) ?
                    (options?.editOptions?.editableOnUpdate?.includes(column)) ? "onUpdate" :
                        "never" : "always",
                editComponent: (options && 'editOptions' in options && 'customEditComponent' in options.editOptions) ? options.editOptions.customEditComponent[column] : null,
                hidden: (options && 'hidden' in options) ? options.hidden[column] : null
            });

        }
        return temp;
    });

    useEffect(() => {
        setDisplayColumns((prev) => {
            for (let column in prev) {
                prev[column] = {
                    title: prev[column].title,
                    field: prev[column].field,
                    initialEditValue: (options && 'initialEditValue' in options) ? options.initialEditValue[prev[column].field] : null,
                    lookup: (options && 'lookup' in options) ? options.lookup[prev[column].field] : null,
                    filtering: (options && 'filter' in options) ? options.filter[prev[column].field] : true,
                    render: (options && 'render' in options) ? options.render[prev[column].field] : null,
                    type: (options && 'type' in options) ? options.type[prev[column].field] : null,
                    cellStyle: { textAlign: 'start' },
                    customSort: (options && 'customSort' in options) ? options.customSort[prev[column].field] : null,
                    validate: (options && 'customValidate' in options) ? options.customValidate[prev[column].field] : null,
                    editable: (options?.editOptions?.disableCols?.includes(prev[column].field)) ?
                        (options?.editOptions?.editableOnUpdate?.includes(prev[column].field)) ? "onUpdate" :
                            "never" : "always",
                    editComponent: (options && 'editOptions' in options && 'customEditComponent' in options.editOptions) ? options.editOptions.customEditComponent[prev[column].field] : null,
                    hidden: (options && 'hidden' in options) ? options.hidden[prev[column].field] : null
                };

            }
            return prev;
        })
    }, [options])





    //stop loading animation & adjust paging options to data length 
    useEffect(() => {
        if (data) {
            setloading(false);
            if (!options.constPageSize) {
                if (data.length < 10) {
                    setTableOptions(prevOptions => { return { ...prevOptions, pageSizeOptions: [data.length, 10, 50, 100].sort((a, b) => a - b) } })
                    tableRef.current.dataManager.changePageSize(data.length)
                }
                else {
                    setTableOptions(prevOptions => { return { ...prevOptions, pageSizeOptions: [10, 50, 100] } })
                    if (![10, 50, 100].includes(tableRef.current.dataManager.pageSize))
                        tableRef.current.dataManager.changePageSize(10)
                }
            }
        }
    }, [data])



    const editable = {};
    if (options?.editOptions?.add)
        editable.onRowAdd = (newData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                if (options.editOptions.add(newData)) {
                    resolve();
                } else {
                    reject();
                    setloading(false);

                }
            });
        }
    if (options?.editOptions?.update)
        editable.onRowUpdate = (newData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                if (options.editOptions.update(newData)) {
                    resolve();
                }
                else {
                    reject();
                    setloading(false);
                }
            });
        }
    if (options?.editOptions?.delete)

        editable.onRowDelete = (oldData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                options.editOptions.delete(oldData);
                resolve();
            });
        }



    return (

        <>
            <MaterialTable
                tableRef={tableRef}
                // icons={tableIcons}
                title={title}
                columns={displayColumns}
                data={data}
                onRowClick={options?.onRowClick}
                detailPanel={options?.detailPanel}
                totalCount={data?.length}
                editable={editable}
                isLoading={loading}
                actions={actions}
                options={tableOptions}
                style={options?.style}
                renderSummaryRow={options?.renderSummaryRow}
                


                localization={{
                    body: {
                        emptyDataSourceMessage: 'אין נתונים להצגה',
                        addTooltip: 'הוספה',
                        deleteTooltip: 'מחיקה',
                        editTooltip: 'עריכה',
                        editRow: {
                            deleteText: 'האם אתה בטוח שאתה רוצה למחוק את השורה הזאת?',
                            cancelTooltip: 'ביטול',
                            saveTooltip: 'שמירה'
                        }

                    },
                    header: {
                        actions: 'פעולות',
                    },
                    pagination: {
                        labelDisplayedRows: '{to}-{from} מתוך {count}',
                        labelRowsSelect: 'שורות',
                        labelRowsPerPage: 'מספר שורות בעמוד:',
                        firstAriaLabel: 'עמוד ראשון',
                        firstTooltip: 'עמוד ראשון',
                        previousAriaLabel: 'עמוד קודם',
                        previousTooltip: 'עמוד קודם',
                        nextAriaLabel: 'עמוד הבא',
                        nextTooltip: 'עמוד הבא',
                        lastAriaLabel: 'עמוד אחרון',
                        lastTooltip: 'עמוד אחרון'
                    },
                    toolbar: {
                        exportTitle: 'ייצוא',
                        exportAriaLabel: 'ייצוא המידע לקובץ',
                        exportName: 'ייצוא כקובץ אקסל',
                        searchTooltip: 'חיפוש',
                        searchPlaceholder: 'חיפוש',
                        showColumnsTitle: 'עמודות להצגה',
                        showColumnsAriaLabel: 'בחירת עמודות להצגה',
                        addRemoveColumns: 'הוסף\\הסר עמודות להצגה',
                    }
                }}
            />
            {(!options?.noCover) && < div className='cover' style={{ height: (options?.filtering) ? '150px' : '125px' }} />}
        </>
    )
}

// Table.propTypes = {}

export default Table
