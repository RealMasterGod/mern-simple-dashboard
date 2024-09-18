import { Link, useLocation } from "react-router-dom";
import "./editJob.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { editClient } from "../../features/apiCalls";

const EditJob = () => {
  const dispatch = useDispatch()
  const clientId = useLocation().pathname.split("/")[2];
  const {error} = useSelector(state => state.client.error)
  const client = useSelector((state) =>
    state.client.clients.find((client) => client.clientId === clientId)
  );
  const [thisClient, setThisClient] = useState(null);
  useEffect(() => {
    setThisClient(client);
  }, [client]);
  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log(thisClient)
    const obj = {...thisClient}
    if(thisClient.inventoryUpload && thisClient.inventoryUpload !== client.inventoryUpload) {
      const data = new FormData();
      const fileName = Date.now() + thisClient.inventoryUpload.name;
      data.append("name", fileName);
      data.append("file", thisClient.inventoryUpload);
      obj.inventoryUpload = fileName
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    editClient(dispatch,obj.clientId,obj)
  }
  return (
    <div className="edit-job">
      <div className="edit-job-wrapper">
        <div className="edit-job-topbar">edit job sheet</div>
        {thisClient ? (
          <form className="edit-job-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Client Name:</label>
              <input
                type="text"
                name="clientName"
                value={thisClient.clientName}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Contact Info (Phone 10nos):</label>
              <input
                name="contactInfo"
                maxLength={10}
                minLength={10}
                type="text"
                value={thisClient.contactInfo}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Received Date:</label>
              <input
                name="receivedDate"
                type="date"
                value={thisClient.receivedDate.slice(0,10)}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Inventory Received:</label>
              <input
                name="inventoryReceived"
                type="text"
                value={thisClient.inventoryReceived}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Upload Inventory Image/Document/Video:</label>
              <input
                name="inventoryUpload"
                type="file"
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.files[0] };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Reported Issues:</label>
              <textarea
                name="reportedIssues"
                rows={5}
                value={thisClient?.reportedIssues || ""}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="form-row">
              <label>Client Notes:</label>
              <textarea
                name="clientNotes"
                rows={5}
                value={thisClient?.clientNotes || ""}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="form-row">
              <label>Assigned Technician:</label>
              <input
                name="assignedTechnician"
                type="text"
                value={thisClient.assignedTechnician}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Deadline</label>
              <input
                name="deadline"
                type="date"
                value={thisClient.deadline.slice(0,10)}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Estimated Amount</label>
              <input
                name="estimatedAmount"
                type="text"
                value={thisClient.estimatedAmount}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-row">
              <label>Status:</label>
              <select
                name="status"
                id=""
                value={thisClient.status}
                onChange={(e) =>
                  setThisClient((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <button type="submit" className="save-changes-btn">Save Changes</button>
            {error && <div style={{fontWeight: "lighter", color: 'red', textAlign: "center"}}>An error occurred...</div>}
            <div className="cancel">
              <span>
                <Link className="link" to={"/"}>
                  Cancel
                </Link>
              </span>
            </div>
          </form>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
};

export default EditJob;
