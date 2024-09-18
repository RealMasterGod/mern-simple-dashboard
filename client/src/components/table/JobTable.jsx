import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./jobtable.css";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteClient, getAllClients } from "../../features/apiCalls";
import { useEffect, useState } from "react";

function createData(
  clientId,
  clientName,
  contactInfo,
  receivedDate,
  inventoryReceived,
  reportedIssue,
  clientNotes,
  assignedTechnician,
  estimatedAmount,
  deadline,
  status
) {
  return {
    clientId,
    clientName,
    contactInfo,
    receivedDate,
    inventoryReceived,
    reportedIssue,
    clientNotes,
    assignedTechnician,
    estimatedAmount,
    deadline,
    status,
  };
}

const rows = [
  createData(
    "nand9953",
    "nandini goswami",
    "1234567890",
    "2024-09-05",
    "mouse",
    "high",
    "f",
    "f",
    "None",
    "2024-09-18",
    "in-progress"
  ),
  createData(
    "nand9953",
    "nandini goswami",
    "1234567890",
    "2024-09-05",
    "mouse",
    "high",
    "f",
    "f",
    "None",
    "2024-09-18",
    "in-progress"
  ),
];

const JobTable = ({text}) => {
  const navigate = useNavigate();
  const {clients,isFetching,error} = useSelector(state =>state.client)
  const [data,setData] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!text) {
      setData(clients)
    } else {
      const filteredData = clients.filter(client => {
        if(client.clientId.toLowerCase().match(text.toLocaleLowerCase()) || client.clientName?.toLowerCase().match(text.toLocaleLowerCase())) {
          return client
        }
      })
      setData(filteredData)
    }
  }, [text,clients])
  // console.log(data)

  const handleDelete = async (id) => {
    deleteClient(dispatch,id)
  }
  
  if(isFetching || !data) {
    // console.log(isFetching,data)
    return <div>
      <h3>Loading Table...</h3>
    </div>
  }

  if(error && !data) {
    return <div>
      <h3 style={{color: 'red'}}>An Error occurred while fetching table data!</h3>
    </div>
  }
  return (
    <TableContainer style={{ borderRadius: 0, border: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "rgb(22, 60, 95" }}>
          <TableRow>
            <TableCell className="row-head">#</TableCell>
            <TableCell className="row-head">Client Id</TableCell>
            <TableCell className="row-head" align="left">
              Client Name
            </TableCell>
            <TableCell className="row-head" align="left">
              Contact Info
            </TableCell>
            <TableCell className="row-head" align="left">
              Received Date
            </TableCell>
            <TableCell className="row-head" align="left">
              Inventory Received
            </TableCell>
            <TableCell className="row-head" align="left">
              Reported Issue
            </TableCell>
            <TableCell className="row-head" align="left">
              Client Notes
            </TableCell>
            <TableCell className="row-head" align="left">
              Assigned Technician
            </TableCell>
            <TableCell className="row-head" align="left">
              Estimated Amount
            </TableCell>
            <TableCell className="row-head" align="left">
              Deadline
            </TableCell>
            <TableCell className="row-head" align="left">
              Status
            </TableCell>
            <TableCell className="row-head" align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:nth-child(2n)": { backgroundColor: "#eef" },
                borderTop: "2px solid #ddd",
                borderBottom: "2px solid #ddf",
              }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.clientId}
              </TableCell>
              <TableCell align="left">{row.clientName}</TableCell>
              <TableCell align="left">{row.contactInfo}</TableCell>
              <TableCell align="left">{row.receivedDate.slice(0,10)}</TableCell>
              <TableCell align="left">{row.inventoryReceived}</TableCell>
              <TableCell align="left">{row?.reportedIssue ? row.reportedIssue : "-"}</TableCell>
              <TableCell align="left">{row?.clientNotes ? row.clientNotes : "-"}</TableCell>
              <TableCell align="left">{row.assignedTechnician}</TableCell>
              <TableCell align="left">{row.estimatedAmount === 0 ? "None" : row.estimatedAmount}</TableCell>
              <TableCell align="left">{row.deadline.slice(0,10)}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell className="actions" align="right">
                <button onClick={() => handleDelete(row.clientId)} className="delete">Delete</button>
                <button
                  onClick={() => navigate(`/edit/${row.clientId}`)}
                  className="edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/view/${row.clientId}`)}
                  className="view"
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
