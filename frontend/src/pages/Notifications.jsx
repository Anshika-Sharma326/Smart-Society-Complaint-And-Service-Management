import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      loadNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Layout>
      <div className="notifications-container">
        <h1>Notifications</h1>

        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div className="notification-card" key={item.id}>
              <div>
                <h3>{item.title}</h3>

                <p>{item.message}</p>

                <small>{item.type}</small>
              </div>

              <button onClick={() => deleteNotification(item.id)}>
                Mark Read
              </button>
            </div>
          ))
        ) : (
          <h3>No notifications available.</h3>
        )}
      </div>
    </Layout>
  );
}

export default Notifications;