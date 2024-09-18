import { Link, useLocation, useNavigate } from "react-router-dom";
import "./view.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteClient, editClient } from "../../features/apiCalls";

const View = () => {
  const clientId = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)
  
  const client = useSelector((state) =>
    state.client.clients.find((client) => client.clientId === clientId)
  );

  // console.log(client)

  const [note,setNote] = useState("")

  useEffect(() => {
    client?.clientNotes && setNote(client.clientNotes)
    !client && setLoading(false)
  },[client])

  const handleClick = () => {
    editClient(dispatch,clientId,{clientNotes: note})
  }

  const handleDelete = () => {
    deleteClient(dispatch,clientId)
  }

  const url = "http://localhost:5000/uploads/"

  return (
    <div className="view-job">
      <div className="view-wrapper">
        <div className="view-topbar">view job sheet</div>
        {client ? <div className="info-container">
          <div className="info-row">
            <div className="field">Client Name:</div>
            <div className="value">{client.clientName}</div>
          </div>
          <div className="info-row">
            <div className="field">Contact Info:</div>
            <div className="value">{client.contactInfo}</div>
          </div>
          <div className="info-row">
            <div className="field">Received Date:</div>
            <div className="value">{client.receivedDate.slice(0,10)}</div>
          </div>
          <div className="info-row">
            <div className="field">Inventory Received:</div>
            <div className="value">{client.inventoryReceived}</div>
          </div>
          <div className="info-row">
            <div className="field">Inventory Image/Document/Video:</div>
            {client.inventoryUpload ? <div className="value" ><span style={{cursor: 'pointer'}} onClick={() => window.open(`${url}${client.inventoryUpload}`)}>View File</span></div> : <div style={{color: 'black',cursor: "initial",fontWeight: "normal"}} className="value">None</div>}
          </div>
          <div className="info-row">
            <div className="field">Reported Issues:</div>
            <div className="value">{client?.reportedIssues || "None"}</div>
          </div>
          <div className="info-row">
            <div className="field">Client Notes</div>
            <div className="value">{client?.clientNotes || "None"}</div>
          </div>
          <div className="info-row">
            <div className="field">Assigned Technicians:</div>
            <div className="value">{client.assignedTechnician}</div>
          </div>
          <div className="info-row">
            <div className="field">Estimated Amount</div>
            <div className="value">{client.estimatedAmount === "0" ? "None" : client.estimatedAmount}</div>
          </div>
          <div className="info-row">
            <div className="field">Deadline</div>
            <div className="value">{client.deadline.slice(0,10)}</div>
          </div>
          <div className="info-row">
            <div className="field">Status</div>
            <div className="value">{client.status}</div>
          </div>
        </div> : loading ? <h3>Loading...</h3> : <h3>Not Found :/</h3>}
        {client && <><div className="note">
            <label htmlFor="">Add or Update Note:</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="note-textarea" rows={5} cols={35}></textarea>
        </div>
        <button onClick={handleClick} className="save-note-btn">Save Note</button>
        <div className="edit-delete">
            <span><Link className="link" to={`/edit/${clientId}`}>Edit</Link></span>
            <span onClick={handleDelete} >Delete</span>
        </div>
        <div className="back">
            <span><Link className={"link"} to={"/"}>Back</Link></span>
        </div>
        <button onClick={() => window.print()} className="print-btn">Save as PDF</button></>}
      </div>
    </div>
  );
};

export default View;
