import React, { useMemo, useCallback } from 'react';

export const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Age",
      accessor: "age",
      Cell: (props) => {
        const range = [20,40,60,80,100];
        let interval = binarySearch(range, props.value);

        return (
          <span className={interval}>
            {props.value}
          </span>
        );
      }
    },
    {
      Header: "Email",
      accessor: "email",
    },
];

function binarySearch(arr,n) {
  let min = 0;
  let max = arr.length - 1;
  let mid;

  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    if (arr[mid] === n) {
      return mid + 1;
    } else if (arr[mid] < n) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return `age--${min}`;
}