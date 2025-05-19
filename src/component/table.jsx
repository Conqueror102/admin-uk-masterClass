import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Table = ({ candidates, setCandidates, refreshCounts, refreshTbData }) => {
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    if (newStatus === 'rejected') {
      setSelectedCandidateIndex(index);
      setDeclineModalOpen(true);
    } else {
      updateStatus(index, newStatus);
    }
  };

  const updateStatus = async (index, newStatus, reason = '') => {
    const updatedCandidates = [...candidates];

    try {
      const token = localStorage.getItem("token"); // 🔐 Get the token

      await axios.patch(
        `https://ukmasterclassbackend.onrender.com/api/users/${updatedCandidates[index]._id}/status`,
        {
          status: newStatus,
          rejectionReason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add the token to headers
          },
        }
      );

      updatedCandidates[index].status = newStatus;
      if (setCandidates) setCandidates(updatedCandidates); // <-- Fix: check if setCandidates exists

      if (refreshCounts) refreshCounts();

      alert("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleViewDocuments = (documents) => {
    setSelectedDocuments(documents);
    setDocumentModalOpen(true);
  };

  const handleDeleteUser = async (userId, index) => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Get token

      await axios.delete(
        `https://ukmasterclassbackend.onrender.com/api/admin/${userId}/deleteUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
        }
      );

      // Update local state
      const updated = [...candidates];
      updated.splice(index, 1);
      if (setCandidates) setCandidates(updated); // <-- Fix: check if setCandidates exists

      if (refreshCounts) refreshCounts();
      if (refreshTbData) refreshTbData();

      alert("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full border-collapse text-center rounded-lg min-w-[1000px]">
        <thead className="text-left text-[14px]">
          <tr>
            <th className="py-2 rounded-tl-lg">FirstName</th>
            <th className="py-2">LastName</th>
            <th className="py-2">Contact</th>
            <th className="py-2">Country</th>
            <th className="py-2">Date</th>
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2 rounded-tr-lg">Documents</th>
          </tr>
        </thead>

        {Array.isArray(candidates) && candidates.length > 0 ? (
          candidates.map((prop, index) => (
            <tbody key={index} className="text-left">
              <tr className="bg-white hover:bg-[#ececec] hover:text-black pt-4 relative">
                <td className="px-4 py-3 border-b font-semibold rounded-tl-md rounded-bl-md border-gray-200 max-w-[150px] truncate" title={prop.firstName}>
                  {prop.firstName}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 max-w-[150px] truncate" title={prop.lastName}>
                  {prop.lastName}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 max-w-[150px] truncate" title={prop.number}>
                  {prop.number}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 max-w-[150px] truncate" title={prop.countryOfOrigin}>
                  {prop.countryOfOrigin}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 max-w-[150px] truncate" title={new Date(prop.createdAt).toLocaleDateString()}>
                  {new Date(prop.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 max-w-[200px] truncate" title={prop.email}>
                  {prop.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <select
                    value={prop.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className={`py-1 px-3 text-xs font-semibold outline-none rounded-full ${
                      prop.status === 'approved'
                        ? 'bg-green-200 text-green-500'
                        : prop.status === 'rejected'
                        ? 'bg-red-200 text-red-500'
                        : 'bg-yellow-200 text-yellow-500'
                    }`}
                  >
                    <option value="approved" className="bg-white text-black">
                      Approved
                    </option>
                    <option value="rejected" className="bg-white text-black">
                      Declined
                    </option>
                    <option value="pending" className="bg-white text-black">
                      Pending
                    </option>
                  </select>
                </td>
                <td className="px-4 py-3 border-b w-30 border-gray-200 rounded-tr-md rounded-br-md  flex">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-500"
                    onClick={() => handleViewDocuments(prop.documents)}
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setCandidateToDelete({ id: prop._id, index });
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 text-lg ml-3"
                    title="Delete User"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td colSpan="8" className="text-center py-4">No candidates found.</td>
            </tr>
          </tbody>
        )}
      </table>

      {/* delete modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDeleteUser(candidateToDelete.id, candidateToDelete.index);
                  setDeleteModalOpen(false);
                  setCandidateToDelete(null);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {documentModalOpen && (
        <div className="fixed inset-0 bg-[#0000000b] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">User Documents</h2>
            <button
              className="absolute top-2 right-3 text-red-500 hover:text-black"
              onClick={() => setDocumentModalOpen(false)}
            >
              x
            </button>
            {selectedDocuments ? (
              <ul className="space-y-2">
                {Object.entries(selectedDocuments).map(([name, url], i) => (
                  <li key={i}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents available.</p>
            )}
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {declineModalOpen && (
        <div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Send Decline Email</h2>
            <button
              className="absolute top-2 right-3 text-red-500 hover:text-black"
              onClick={() => {
                setDeclineModalOpen(false);
                setDeclineReason('');
              }}
            >
              x
            </button>

            <textarea
              placeholder="Enter reason for declining"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              rows="4"
            />

            <button
              onClick={async () => {
                await updateStatus(selectedCandidateIndex, "rejected", declineReason);
                setDeclineModalOpen(false);
                setDeclineReason('');
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Send & Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;