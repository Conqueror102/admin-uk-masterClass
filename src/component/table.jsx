import React, { useRef, useState } from 'react';

const Table = ({ candidates }) => { // Receive candidates as a prop
  const [visibleUser, setVisibleUser] = useState(null);
  const dropdownRefs = useRef([]);

  const handleStatusChange = (index, newStatus) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].status = newStatus;
    // Assuming you have a function to update the status on the backend
    // You would call that function here
    console.log(`Updating status of user ${updatedCandidates[index].firstName} to ${newStatus}`);
    // For now, just update the local state
    // setCandidates(updatedCandidates); // If Table manages its own state (not recommended with prop passing)
  };

  const handleViewDocuments = (index) => {
    setVisibleUser(visibleUser === index ? null : index);
  };

  return (
    <div className='max-sm:overflow-x-auto'>
      <table className="table-auto w-full border-collapse text-center rounded-lg min-w-full ">
        <thead className="rounded-lg text-left text-[14px]">
          <tr>
            <th className="px-4 py-2 rounded-tl-lg w-30">FirstName</th>
            <th className="px-4 py-2 w-30">LastName</th>
            <th className="px-4 py-2 w-30">Contact</th>
            <th className="px-4 py-2 w-30">Country</th>
            <th className="px-4 py-2 w-30">Date</th>
            <th className="px-4 py-2 w-30">Email</th>
            <th className="px-4 py-2 w-30">Status</th>
            <th className="px-4 py-2 w-30">Documents</th>
          </tr>
        </thead>

        {candidates.map((prop, index) => (
          <tbody key={index} className="text-left">
            <tr className="bg-white hover:bg-[#ececec] hover:text-black pt-4   relative">
              <td className="px-4 py-3 border-b w-30 font-semibold rounded-tl-md rounded-bl-md border-gray-200">
                {prop.firstName}
              </td>
              <td className="px-4 py-3 w-30 border-b border-gray-200">
                {prop.lastName}
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200">
                {prop.contact}
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200">
                {prop.country}
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200">
                {new Date(prop.createdAt).toLocaleDateString()} {/* Format the date */}
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200">
                {prop.email}
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200">
                <select
                  value={prop.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className={`py-1 px-3  text-xs font-semibold outline-none rounded-full ${prop.status === 'approved' ? 'bg-green-200 text-green-500' : prop.status === 'declined' ? 'bg-red-200 text-red-500' : 'bg-yellow-200 text-yellow-500'}`}
                >
                  <option value="approved" className='bg-white text-black'>Approved</option>
                  <option value="declined" className='bg-white text-black'>Declined</option>
                  <option value="pending" className='bg-white text-black'>Pending</option>
                </select>
              </td>
              <td className="px-4 py-3 border-b w-30 border-gray-200 rounded-tr-md rounded-br-md">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-500"
                  onClick={() => handleViewDocuments(index)}
                  ref={(el) => (dropdownRefs.current[index] = el)}
                >
                  View
                </button>

                {visibleUser === index && (
                  <div
                    className="absolute z-100 mt-2 bg-white  rounded-md shadow-lg max-w-50"
                    style={{ top: '68%', left:"80%" }}
                  >
                    <h4 className="font-semibold p-2 bg-gray-100 ">Documents:</h4>
                    <ul className="list-none p-2">
                      {prop.documents.map((doc, i) => (
                        <li key={i} className="mb-1">
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {doc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;

// import React, { useRef, useState } from 'react';

// const Table = () => {
//   const [visibleUser, setVisibleUser] = useState(null);
//   const dropdownRefs = useRef([]);
//   const [candidates, setCandidates] = useState([
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://example.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://exxxmple.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://example.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://example.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://example.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
//    {firstName:"victor",
//     lastName:"onyemaechi",
//     contact:"08025383208",
//      date:3322,
//      email:"victorvector608@gmail.com", 
//      documents:[
//       "http://example.com"
//      ],
//      status:"pending",
//       country:"nigeria"
//     },
    
//   ]);

//   const handleStatusChange = (index, newStatus) => {
//     const updatedCandidates = [...candidates];
//     updatedCandidates[index].status = newStatus;
//     setCandidates(updatedCandidates);
//   };
  
  

//   const handleViewDocuments = (index) => {
//     setVisibleUser(visibleUser === index ? null : index);
//   };

//   return (
//     <div className='max-sm:overflow-x-auto'>
//       <table className="table-auto w-full border-collapse text-center rounded-lg min-w-full ">
//         <thead className="rounded-lg text-left text-[14px]">
//           <tr>
//             <th className="px-4 py-2 rounded-tl-lg w-30">FirstName</th>
//             <th className="px-4 py-2 w-30">LastName</th>
//             <th className="px-4 py-2 w-30">Contact</th>
//             <th className="px-4 py-2 w-30">Country</th>
//             <th className="px-4 py-2 w-30">Date</th>
//             <th className="px-4 py-2 w-30">Email</th>
//             <th className="px-4 py-2 w-30">Status</th>
//             <th className="px-4 py-2 w-30">Documents</th>
//           </tr>
//         </thead>

//         {candidates.map((prop, index) => (
//           <tbody key={index} className="text-left">
//             <tr className="bg-white hover:bg-[#ececec] hover:text-black pt-4   relative">
//               <td className="px-4 py-3 border-b w-30 font-semibold rounded-tl-md rounded-bl-md border-gray-200">
//                 {prop.firstName}
//               </td>
//               <td className="px-4 py-3 w-30 border-b border-gray-200">
//                 {prop.lastName}
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200">
//                 {prop.contact}
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200">
//                 {prop.country}
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200">
//                 {prop.date}
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200">
//                 {prop.email}
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200">
//                 <select
//                   value={prop.status}
//                   onChange={(e) => handleStatusChange(index, e.target.value)}
//                   className={`py-1 px-3  text-xs font-semibold outline-none rounded-full ${prop.status === 'approved' ? 'bg-green-200 text-green-500' : prop.status === 'declined' ? 'bg-red-200 text-red-500' : 'bg-yellow-200 text-yellow-500' }`}
//                 >
//                   <option value="approved" className='bg-white text-black'>Approved</option>
//                   <option value="declined" className='bg-white text-black'>Declined</option>
//                   <option value="pending" className='bg-white text-black'>Pending</option>
//                 </select>
//               </td>
//               <td className="px-4 py-3 border-b w-30 border-gray-200 rounded-tr-md rounded-br-md">
//               <button
//                   className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-500"
//                   onClick={() => handleViewDocuments(index)}
//                   ref={(el) => (dropdownRefs.current[index] = el)}
//                 >
//                   View
//                 </button>

//                 {visibleUser === index && (
//                   <div
//                     className="absolute z-100 mt-2 bg-white  rounded-md shadow-lg max-w-50"
//                     style={{ top: '68%', left:"80%" }}
//                   >
//                     <h4 className="font-semibold p-2 bg-gray-100 ">Documents:</h4>
//                     <ul className="list-none p-2">
//                       {prop.documents.map((doc, i) => (
//                         <li key={i} className="mb-1">
//                           <a
//                             href={doc}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:underline"
//                           >
//                             {doc}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         ))}
//       </table>
//     </div>
//   );
// };

// export default Table;