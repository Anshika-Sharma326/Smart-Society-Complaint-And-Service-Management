// import Layout from "../components/Layout";
// import "./ManageResidents.css";
// import { useState } from "react";
// import AddResidentModal from "../components/AddResidentModal";
// import EditResidentModal from "../components/EditResidentModal";

// const initialResidents = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul@gmail.com",
//     mobile: "9876543210",
//     flat: "A-101",
//   },
//   {
//     id: 2,
//     name: "Priya Singh",
//     email: "priya@gmail.com",
//     mobile: "9876501234",
//     flat: "B-203",
//   },
//   {
//     id: 3,
//     name: "Amit Kumar",
//     email: "amit@gmail.com",
//     mobile: "9876512345",
//     flat: "C-305",
//   },
// ];
// function ManageResidents() {

//   const [showModal, setShowModal] = useState(false);
//   const [residents, setResidents] = useState(initialResidents);
//   const [editResident, setEditResident] = useState(null);
//   const [search, setSearch] = useState("");
//   const addResident = (resident) => {
//     setResidents([
//       ...residents,
//       {
//         id: residents.length + 1,
//         ...resident,
//       },
//     ]);

//     setShowModal(false);
//   };
//   const deleteResident = (id) => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this resident?"
//   );

//   if (confirmDelete) {
//     setResidents(
//       residents.filter((resident) => resident.id !== id)
//     );
//   }
// };
// const updateResident = (updatedResident) => {
//   setResidents(
//     residents.map((resident) =>
//       resident.id === updatedResident.id
//         ? updatedResident
//         : resident
//     )
//   );

//   setEditResident(null);
// };
// const filteredResidents = residents.filter((resident) =>
//   resident.name.toLowerCase().includes(search.toLowerCase()) ||
//   resident.email.toLowerCase().includes(search.toLowerCase()) ||
//   resident.flat.toLowerCase().includes(search.toLowerCase())
// );
//   return (
//     <Layout>
//       <div className="resident-container">
//         <div className="resident-header">
//           <h1>Manage Residents</h1>
//           <button
//             className="add-btn"
//             onClick={() => setShowModal(true)}
//           >
//             + Add Resident
//           </button>
//         </div>
//         <input
//           className="search-box"
//           type="text"
//           placeholder="🔍 Search Resident..."
//         />
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Flat</th>
//               <th>Action</th>
//             </tr>

//           </thead>

//           <tbody>

//            {filteredResidents.map((resident) => (

//               <tr key={resident.id}>

//                 <td>{resident.id}</td>
//                 <td>{resident.name}</td>
//                 <td>{resident.email}</td>
//                 <td>{resident.mobile}</td>
//                 <td>{resident.flat}</td>

//                 <td>

//                   <button className="view">
//                     View
//                   </button>

//                   <button
//                     className="edit"
//                     onClick={() => setEditResident(resident)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                   className="delete"
//                   onClick={() => deleteResident(resident.id)}
//                 >
//                   Delete
//                 </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>
//         {showModal && (
//           <AddResidentModal
//             onClose={() => setShowModal(false)}
//             onSave={addResident}
//           />
//         )}
//         {editResident && (
//           <EditResidentModal
//             resident={editResident}
//             onClose={() => setEditResident(null)}
//             onUpdate={updateResident}
//           />
//         )}
//       </div>
//     </Layout>

//   );
// }

// export default ManageResidents;

import Layout from "../components/Layout";
import "./ManageResidents.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import AddResidentModal from "../components/AddResidentModal";
import EditResidentModal from "../components/EditResidentModal";
import ResidentModal from "../components/ResidentModal";

function ManageResidents() {
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState([]);
  const [editResident, setEditResident] = useState(null);
  const [selectedResident, setSelectedResident] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {
    try {
      const response = await api.get("/residents");
      setResidents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addResident = async (resident) => {
    try {
      await api.post("/residents", resident);

      loadResidents();

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteResident = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resident?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/residents/${id}`);

      loadResidents();
    } catch (error) {
      console.error(error);
    }
  };

  const updateResident = async (updatedResident) => {
    try {
      await api.put(`/residents/${updatedResident.id}`, updatedResident);

      loadResidents();

      setEditResident(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(search.toLowerCase()) ||
      resident.email.toLowerCase().includes(search.toLowerCase()) ||
      resident.flat.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="resident-container">
        <div className="resident-header">
          <h1>Manage Residents</h1>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Resident
          </button>
        </div>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Resident..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Flat</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
                <tr key={resident.id}>
                  <td>{resident.id}</td>
                  <td>{resident.name}</td>
                  <td>{resident.email}</td>
                  <td>{resident.mobile}</td>
                  <td>{resident.flat}</td>

                  <td>
                    <button
                      className="view"
                      onClick={() => setSelectedResident(resident)}
                    >
                      View
                    </button>

                    <button
                      className="edit"
                      onClick={() => setEditResident(resident)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteResident(resident.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No residents found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && (
          <AddResidentModal
            onClose={() => setShowModal(false)}
            onSave={addResident}
          />
        )}

        {editResident && (
          <EditResidentModal
            resident={editResident}
            onClose={() => setEditResident(null)}
            onUpdate={updateResident}
          />
        )}
        {selectedResident && (
          <ResidentModal
            resident={selectedResident}
            onClose={() => setSelectedResident(null)}
          />
        )}
      </div>
    </Layout>
  );
}

export default ManageResidents;
