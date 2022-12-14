import React, { useState, useMemo, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from "react-table";
import { Spacer } from '../Layout';
import AddDialog from '../Dialog/AddDialog/AddDialog';
import EditDialog from '../Dialog/EditDialog/EditDialog';
import DeleteDialog from '../Dialog/DeleteDialog/DeleteDialog';
import AddForm from '../../public/svg/addForm.svg';
import EditForm from '../../public/svg/editForm.svg';
import DeleteForm from '../../public/svg/deleteForm.svg';
import SearchIcon from '../../public/svg/searchIcon.svg';
import styles from './Table.module.css';
import clsx from 'clsx';

const classes = {
  cardOuter: 'shadow-md rounded px-8 pt-6 pb-8',
  cardMargin: 'overflow-x-auto sm:-mx-6 lg:-mx-8',
  cardPadding: 'py-2 inline-block min-w-full sm:px-6 lg:px-8',
  addBtn: 'float-right pr-4 pb-4',
  tableOuter: 'min-w-full text-center',
  tableHead: 'text-sm font-medium text-gray-900 px-6 py-4',
  tableRow: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
  tableRowFst: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
  urlLink: 'no-underline hover:underline',
  iconTableRow: 'text-sm text-gray-900 font-light pt-2 whitespace-nowrap',
  // searchLabel: 'mt-2 mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300',
  searchIconOuter: 'flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none',
  searchInput: 'block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black',
  // searchBtn: 'text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
}
 
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  // const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <form>   
      {/* <label htmlFor="search" className={classes.searchLabel}>Filter</label> */}
      <div className="relative">
          <div className={classes.searchIconOuter}>
              <SearchIcon/>
          </div>
          <input type="search" id="search" className={classes.searchInput}
          placeholder="Search" value={value || ''}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}/>
          {/* <button type="submit" className={classes.searchBtn}>Search</button> */}
      </div>
    </form>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
  }) {
  // const count = preFilteredRows.length
  return (
    <input type="search" id="search" className={classes.searchInput}
      placeholder="Search" value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const TableList = (props, ref) => {
  const { className, name, initVal, columns, fields, children, setValue, onSubmit, onDelete, showAction } = props;
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ rowData, setRowData ] = useState(initVal);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const handleAdd = useCallback(() => {
    setOpenAdd(true);
    setValue(initVal);
  }, [openAdd]);

  const handleEdit = useCallback((row) => {
    setOpenEdit(true);
    setValue(row);
  }, [openEdit]);

  const handleDelete = useCallback((row) => {
    setOpenDelete(true);
    setRowData(row);
  }, [openDelete]);

  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  useImperativeHandle(ref, () => ({
    handleClose() {
      setOpenAdd(false);
      setOpenEdit(false);
      setOpenDelete(false);
    }
  }),[])

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const tableInstance = useTable({
    columns,
    data: fields,
    defaultColumn,
    filterTypes,
  }, useFilters,
  useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = tableInstance;

  return (
    <div className={clsx(classes.cardOuter, styles.root)}>
      <div className="flex flex-col">
        <div className={classes.cardMargin}>
          <div className={classes.cardPadding}>
            <span>{name}</span>
            {showAction && <button className={classes.addBtn} 
              onClick={() => handleAdd()}>
              <AddForm />
            </button>}
            <Spacer axis="vertical" size={1} />
            <GlobalFilter
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <div className={styles.tableWrap}>
              <table {...getTableProps()} className={classes.tableOuter}>
                <thead className="border-b">
                  {headerGroups?.map((headerGroup, i) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                      {headerGroup.headers?.map((column, id) => (
                       <th {...column.getHeaderProps()} key={id}
                        className={classes.tableHead}
                        >{column.render("Header")}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={i}
                        className="border-b-2">
                        {row.cells?.map((cell, id) => {
                          return <td {...cell.getCellProps()}
                          key={id} className={classes.tableRow}
                          >{cell.render("Cell")}</td>
                        })}
                        <td>
                          {showAction && <button className={classes.iconTableRow}
                            onClick={() => handleEdit(row.original)}>
                            <EditForm />
                          </button>}
                        </td>
                        <td>
                          {showAction && <button className={classes.iconTableRow}
                            onClick={() => handleDelete(row.original)}>
                            <DeleteForm />
                          </button>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openAdd ?
        <AddDialog
          name={name}
          onClose={handleClose}
          onSubmit={onSubmit}
        >{children}</AddDialog> : <></>}
        {openEdit ?
        <EditDialog
          name={name}
          onClose={handleClose}
          onSubmit={onSubmit}
        >{children}</EditDialog> : <></>}
        {openDelete ?
        <DeleteDialog
          name={name}
          onClose={handleClose}
          onDelete={onDelete}
          rowData={rowData}
        ></DeleteDialog> : <></>}
      </div>
    </div>
  );
};

export default forwardRef(TableList);
