import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./StaffDashboard.css";

function StaffDashboard() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {
        try {
            const response = await api.get("/complaints");
            setComplaints(response.data);
        } catch (error) {
            console.error("Error loading complaints:", error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const complaint = complaints.find((c) => c.id === id);

            await api.put(`/complaints/${id}`, {
                ...complaint,
                status,
            });

            loadComplaints();
        } catch (error) {
            console.error("Error updating complaint:", error);
        }
    };

    const completed = complaints.filter(
        (item) => item.status === "Resolved"
    ).length;

    const pending = complaints.filter(
        (item) => item.status === "Pending"
    ).length;

    return (
        <Layout>
            <div className="staff-dashboard">

                <h1>Staff Dashboard</h1>

                <div className="staff-cards">

                    <div className="staff-card">
                        <h3>Assigned Complaints</h3>
                        <h2>{complaints.length}</h2>
                    </div>

                    <div className="staff-card completed">
                        <h3>Completed</h3>
                        <h2>{completed}</h2>
                    </div>

                    <div className="staff-card pending">
                        <h3>Pending</h3>
                        <h2>{pending}</h2>
                    </div>

                </div>

                <div className="table-box">

                    <h2>Assigned Complaints</h2>

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Complaint</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>

                        <tbody>

                            {complaints.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.priority}</td>
                                    <td>{item.status}</td>

                                    <td>

                                        <button
                                            className="progress-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    item.id,
                                                    "In Progress"
                                                )
                                            }
                                        >
                                            In Progress
                                        </button>

                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    item.id,
                                                    "Resolved"
                                                )
                                            }
                                        >
                                            Complete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </Layout>
    );
}

export default StaffDashboard;