import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PagesStyles/UsersTable.css";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function UsersTable() {
  const [adminData, setAdminData] = useState([]);
  const [isThisAdmin, setIsThisAdmin] = useState(false);
  const [wholeWatchlist, setWholeWatchlist] = useState([]);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    localStorage.getItem("currentUser") &&
      JSON.parse(localStorage.getItem("currentUser")).isAdmin &&
      setIsThisAdmin(true);
  }, []);

  function toggleBlock(e, u) {
    fetch(`http://localhost:3001/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id, isBlocked: !u.isBlocked }),
    })
      .then((response) => response.status === 200 && getAllAdminData())
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllAdminData();
    fetch(`http://localhost:3001/watchlist`)
      .then((response) => response.json())
      .then((data) => setWholeWatchlist(data));
  }, []);

  function getAllAdminData() {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => setAdminData(result))
      .catch(console.log);
  }

  function showUserWatchlist(u) {
    // console.log(u.id);
    navigate("/watchlist", { state: u.id });
  }

  const blockUnblockButton = (u) => (
    <TableCell>
      {u.isBlocked ? (
        <Button onClick={(e) => toggleBlock(e, u)}>Unblock</Button>
      ) : (
        <Button onClick={(e) => toggleBlock(e, u)}>block</Button>
      )}
    </TableCell>
  );

  // ---------------------------------------------------

  const columns = [
    { field: "index", headerName: "index", width: 70 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Username", headerName: "Username", width: 150 },
    { field: "email", headerName: "email", type: "mail", width: 200 },
    { field: "Mobile", headerName: "Mobile", type: "number", width: 160 },
    {
      field: "button",
      headerName: "Action",
      width: 250,
      renderCell: blockUnblockButton,
    },
  ];

  useEffect(() => {
    setRows(
      adminData.map((u, index) => {
        return {
          index: index + 1,
          id: u.id,
          Name: u.name,
          Username: u.username,
          email: u.email,
          Mobile: u.mobile,
          button: blockUnblockButton(u),
        };
      })
    );
  }, [adminData]);
  // --------------------------------------------------

  // const usertable = adminData.map((u, index) => {
  //   return (
  //     u.isAdmin === false && (
  //       <TableRow className={u.isBlocked && "userIsBlocked"}>
  //         <TableCell>{index + 1}</TableCell>
  //         <TableCell>{u.id}</TableCell>
  //         <TableCell>{u.name}</TableCell>
  //         <TableCell>{u.username}</TableCell>
  //         <TableCell>{u.email}</TableCell>
  //         <TableCell>{u.mobile}</TableCell>
  //         <TableCell>
  //           <Button
  //             style={{
  //               display: "flex",
  //               margin: "auto",
  //             }}
  //             onClick={() => showUserWatchlist(u)}
  //             variant="contained"
  //             size="small"
  //           >
  //             {
  //               wholeWatchlist.filter((movies) => {
  //                 return movies.userid === u.id;
  //               }).length
  //             }
  //           </Button>
  //         </TableCell>
  //         {isThisAdmin && (
  //           <TableCell>
  //             {u.isBlocked ? (
  //               <Button onClick={(e) => toggleBlock(e, u)}>Unblock</Button>
  //             ) : (
  //               <Button onClick={(e) => toggleBlock(e, u)}>block</Button>
  //             )}
  //           </TableCell>
  //         )}
  //         {/* <TableCell>{u.age}</TableCell> */}
  //       </TableRow>
  //     )
  //   );
  // });
  console.log(rows);
  return (
    // ------------------------------------------
    <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>

    // -----------------------------------------------
    // <div className="usersTable">
    //   <Table striped bordered hover>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>#</TableCell>
    //         <TableCell>ID</TableCell>
    //         <TableCell>Name</TableCell>
    //         <TableCell>Username</TableCell>
    //         <TableCell>E-mail</TableCell>
    //         <TableCell>Number</TableCell>
    //         <TableCell>movies in Watchlist</TableCell>
    //         {isThisAdmin && <TableCell>Block/Unblock</TableCell>}
    //         {/* <TableCell>Age</TableCell> */}
    //       </TableRow>
    //     </TableHead>
    //     <tbody>{usertable}</tbody>
    //   </Table>
    // </div>
  );
}

export default UsersTable;

// ----------------------------------------------------------
