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
        return (
          <span style={{ 
            backgroundColor: "#3DB3FF", color: "#fff",
            borderRadius: 5, display: 'block' }}>
            {props.value}
          </span>
        );
      }
    },
    {
      Header: "Email",
      accessor: "email",
    }
];