// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchItems } from "../features/items/itemSlice";
// import Navbar from "../components/Navbar";

// const BookingPage = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.items);

//   const [filters, setFilters] = useState({ priceRange: "", availability: "" });
//   const [sortBy, setSortBy] = useState("");

//   useEffect(() => {
//     dispatch(fetchItems());
//   }, [dispatch]);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleBooking = (item) => {
//     // Handle booking logic here
//   };

//   const filteredItems = items
//     .filter((item) => {
//       if (filters.priceRange === "low") return item.price < 100;
//       if (filters.priceRange === "medium")
//         return item.price >= 100 && item.price <= 500;
//       if (filters.priceRange === "high") return item.price > 500;
//       return true;
//     })
//     .filter((item) => {
//       if (filters.availability === "available") return item.availability;
//       if (filters.availability === "unavailable") return !item.availability;
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === "priceAsc") return a.price - b.price;
//       if (sortBy === "priceDesc") return b.price - a.price;
//       if (sortBy === "name") return a.title.localeCompare(b.title);
//       return 0;
//     });

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl mb-5">Browse Booking Items</h1>
//       <div className="flex space-x-4 mb-5">
//         <select
//           name="priceRange"
//           onChange={handleFilterChange}
//           className="p-2 border rounded">
//           <option value="">Filter by Price</option>
//           <option value="low">Low (&lt; $100)</option>
//           <option value="medium">Medium ($100-$500)</option>
//           <option value="high">High (&gt; $500)</option>
//         </select>
//         <select
//           name="availability"
//           onChange={handleFilterChange}
//           className="p-2 border rounded">
//           <option value="">Filter by Availability</option>
//           <option value="available">Available</option>
//           <option value="unavailable">Unavailable</option>
//         </select>
//         <select onChange={handleSortChange} className="p-2 border rounded">
//           <option value="">Sort By</option>
//           <option value="priceAsc">Price (Low to High)</option>
//           <option value="priceDesc">Price (High to Low)</option>
//           <option value="name">Name</option>
//         </select>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-3 gap-4">
//           {filteredItems.map((item) => (
//             <div key={item.id} className="p-4 border rounded shadow">
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="w-full h-40 object-cover mb-2"
//               />
//               <h2 className="text-xl font-bold text-center">{item.title}</h2>
//               <p>{item.description}</p>
//               <p>
//                 Price: <spam className="text-gray-600">₹{item.price}</spam>
//               </p>
//               <div>
//                 <p>
//                   Availability:
//                   <span
//                     className={`text-sm ml-2 ${
//                       item.availability ? "text-green-500" : "text-red-500"
//                     }`}>
//                     {item.availability ? "Available" : "Unavailable"}
//                   </span>
//                 </p>
//                 {item.availability ? (
//                   <button onClick={() => handleBooking(item)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
//                     Book Now
//                   </button>
//                 ) : null}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;

import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../features/items/itemSlice";
import { confirmBooking } from "../features/bookings/bookingSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);
  const { loading: bookingLoading } = useSelector((state) => state.bookings);
  const userId = useSelector((state) => state.auth.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays * pricePerDay;
  };

  const handleBookingClick = (item) => {
    // setIsModalOpen(true);
    setSelectedItem(item);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setTotalPrice(0);
  };

  const handleDateChange = (start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    if (start && end && selectedItem) {
      const price = calculateTotalPrice(start, end, selectedItem.price);
      setTotalPrice(price);
    }
  };

  const handleConfirmBooking = () => {
    console.log("userId inside handleConfirmBooking", userId);
    const bookingDetails = {
      userId: userId._id,
      itemId: selectedItem._id,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      totalPrice,
    };
  dispatch(confirmBooking(bookingDetails)).then(() => {
    dispatch(fetchItems());
    setIsModalOpen(false);
    setSelectedItem(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setTotalPrice(0);
  })
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-5">Browse Booking Items</h1>
      {loading || bookingLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-xl font-bold text-center">{item.title}</h2>
              <p>{item.description}</p>
              <p>
                Price per Day:{" "}
                <span className="text-gray-600">₹{item.price}</span>
              </p>
              {item.availability && (
                <button
                  onClick={() => handleBookingClick(item)}
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {selectedItem && (
        <div className="fixed inset-0 bg-black p-6 bg-opacity-50 flex flex-col justify-center items-center z-50">
          <div className="bg-white p-6 rounded">
            {!isModalOpen && <div>
              <h2 className="text-xl font-bold mb-3">
                Select Date/Time for {selectedItem.title}
              </h2>
              <div className="flex space-x-4">
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => handleDateChange(date, selectedEndDate)}
                  selectsStart
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  minDate={new Date()}
                  placeholderText="Select Start Date"
                  className="p-2 border rounded"
                />
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => handleDateChange(selectedStartDate, date)}
                  selectsEnd
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  minDate={selectedStartDate}
                  placeholderText="Select End Date"
                  className="p-2 border rounded"
                />
              </div>
              {totalPrice > 0 && (
                <p className="mt-4">
                  Total Price: <span className="font-bold">₹{totalPrice}</span>
                </p>
              )}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded">
                  Proceed to Confirm
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>}
            {isModalOpen &&<div>
              <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
              {selectedItem && (
                <div>
                  <p>Item: {selectedItem.title}</p>
                  <p>Start Date: {selectedStartDate?.toDateString()}</p>
                  <p>End Date: {selectedEndDate?.toDateString()}</p>
                  <p>Total Price: ₹{totalPrice}</p>
                </div>
              )}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleConfirmBooking}
                  className="bg-green-500 text-white px-4 py-2 rounded">
                  Confirm
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>}
          </div>
        </div>
      )}

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
            {selectedItem && (
              <div>
                <p>Item: {selectedItem.title}</p>
                <p>Start Date: {selectedStartDate?.toDateString()}</p>
                <p>End Date: {selectedEndDate?.toDateString()}</p>
                <p>Total Price: ₹{totalPrice}</p>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleConfirmBooking}
                className="bg-green-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BookingPage;
