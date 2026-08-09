import Layout from "../components/Layout";
import "./ManageComplaints.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditComplaintModal from "../components/EditComplaintModal";
import api from "../services/api";

function ManageComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/complaints?userId=${userId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const updateComplaint = (updatedComplaint) => {
    setComplaints(
      complaints.map((item) =>
        item.id === updatedComplaint.id ? updatedComplaint : item,
      ),
    );

    setEditComplaint(null);
  };

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="manage-container">
        <h1>Manage Complaints</h1>

        <div className="top-bar">
          <input
            type="text"
            placeholder="🔍 Search Complaint..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select>
            <option>All Categories</option>
            <option>Plumbing</option>
            <option>Maintenance</option>
            <option>Electrical</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Complaint</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.title}</td>

                  <td>{item.category}</td>

                  <td>{item.priority}</td>

                  <td>{item.status}</td>

                  <td>{item.createdAt}</td>

                  <td>
                    <button
                      className="view"
                      onClick={() => navigate(`/complaint/${item.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="edit"
                      onClick={() => setEditComplaint(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteComplaint(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <EditComplaintModal
          complaint={editComplaint}
          onClose={() => setEditComplaint(null)}
          onUpdate={updateComplaint}
        />
      </div>
    </Layout>
  );
}

export default ManageComplaints;
