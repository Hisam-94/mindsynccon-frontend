// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserBookings,
//   cancelBooking,
// } from "../features/bookings/bookingSlice";
// import { useNavigate } from "react-router-dom";

// const UserDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
//   const { bookings, loading, error } = useSelector((state) => state.bookings);

//   useEffect(() => {
//     console.log("user", user);
//     if (user?._id) {
//       dispatch(fetchUserBookings(user._id));
//     }

//     console.log("fetching user bookings");
//   }, [dispatch]);

//   const handleCancel = (id) => {
//     console.log("inside handleCancel");

//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       dispatch(cancelBooking(id));
//     }
//   };

//   const handleEdit = (booking) => {
//     console.log("inside handleEdit");
//     navigate(`/edit-booking/${booking._id}`, { state: { booking } });
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl mb-5">My Bookings</h1>
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div key={booking._id} className="p-5 border rounded shadow mb-4">
//             <h2 className="text-xl font-bold mb-2">{booking.item.title}</h2>
//             <p>{booking.item.description}</p>
//             <p className="text-gray-600">
//               Booking Date: {new Date(booking.date).toLocaleDateString()}
//             </p>
//             <p className="text-gray-600">
//               Total Price: ${booking.totalPrice.toFixed(2)}
//             </p>
//             <div className="flex mt-4">
//               <button
//                 onClick={() => handleEdit(booking)}
//                 className="bg-yellow-500 text-white px-4 py-2 mr-4 rounded">
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleCancel(booking._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserBookings,
  cancelBooking,
} from "../features/bookings/bookingSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserBookings(user._id));
      console.log("bookings", bookings);
    }
  }, [dispatch, user?._id]);

  // const handleCancel = (bookingId, itemId) => {
  //   console.log("bookingId inside handleCancel", bookingId);
  //   console.log("itemId inside handleCancel", itemId);
  //   if (window.confirm("Are you sure you want to cancel this booking?")) {
  //     dispatch(cancelBooking(bookingId, itemId));
  //   }
  // };

  const handleCancel = (bookingId, itemId) => {
    console.log("bookingId inside handleCancel", bookingId);
    console.log("itemId inside handleCancel", itemId);
    if (window.confirm("Are you sure you want to cancel this booking?")) {
    dispatch(cancelBooking({ bookingId, itemId })).then(() => {
      dispatch(fetchUserBookings(user._id));
    })
    }
  };

  const handleEdit = (booking) => {
    navigate(`/edit-booking/${booking._id}`, { state: { booking } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-5">My Bookings</h1>
      {bookings?.length > 0 ? (
        bookings.map((booking) => {
          console.log("bb", booking);
          return(
          <div key={booking._id} className="p-5 border rounded shadow mb-4">
            <h2 className="text-xl font-bold mb-2">{booking.itemId?.title}</h2>
            <p>{booking.itemId?.description}</p>
            <p className="text-gray-600">
              From:{" "}
              {booking.startDate
                ? new Date(booking?.startDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600">
              To:{" "}
              {booking.endDate
                ? new Date(booking?.endDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600">
              Total Price: ₹{booking.totalPrice?.toFixed(2) || "N/A"}
            </p>
            <div className="flex mt-4">
              <button
                onClick={() => handleEdit(booking)}
                className="bg-yellow-500 text-white px-4 py-2 mr-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleCancel(booking._id, booking.itemId._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )})
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
