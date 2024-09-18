import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../features/apiCalls";
import "./newJob.css";
import axios from "axios"
import { Link } from "react-router-dom";

const NewJob = () => {
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector(store => store.client)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { inventoryUpload, ...other } = Object.fromEntries(formData);
    // console.log(newClient)
    const newClient = { ...other };
    if (inventoryUpload) {
      const data = new FormData();
      const fileName = Date.now() + inventoryUpload.name;
      data.append("name", fileName);
      data.append("file", inventoryUpload);
      newClient.inventoryUpload = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    addClient(dispatch,newClient);
  };
  return (
    <div className="new-job">
      <div className="new-job-wrapper">
        <div className="new-job-topbar">create new job sheet</div>
        <form className="new-job-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Client Name:</label>
            <input name="clientName" required type="text" />
          </div>
          <div className="form-row">
            <label>Contact Info (Phone 10nos):</label>
            <input
              maxLength={10}
              minLength={10}
              name="contactInfo"
              required
              type="text"
            />
          </div>
          <div className="form-row">
            <label>Received Date:</label>
            <input name="receivedDate" required type="date" />
          </div>
          <div className="form-row">
            <label>Inventory Received:</label>
            <input name="inventoryReceived" required type="text" />
          </div>
          <div className="form-row">
            <label>Upload Inventory Image/Document/Video:</label>
            <input name="inventoryUpload" type="file" />
          </div>
          <div className="form-row">
            <label>Reported Issues:</label>
            <textarea name="reportedIssues" rows={5}></textarea>
          </div>
          <div className="form-row">
            <label>Client Notes:</label>
            <textarea name="clientNotes" rows={5}></textarea>
          </div>
          <div className="form-row">
            <label>Assigned Technician:</label>
            <input name="assignedTechnician" required type="text" />
          </div>
          <div className="form-row">
            <label>Deadline</label>
            <input name="deadline" required type="date" />
          </div>
          <div className="form-row">
            <label>Estimated Amount</label>
            <input name="estimatedAmount" required type="text" />
          </div>
          <div className="form-row">
            <label>Status:</label>
            <select required name="status" id="">
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <button type="submit" className="save-job-btn">
            Save Job Sheet
          </button>
          {error && <div style={{fontWeight: "lighter", color: 'red', textAlign: "center"}}>An error occurred...</div>}
          <div className="back">
            <span><Link className={"link"} to={"/"}>Back</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewJob;
