// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItems } from '../features/items/itemSlice';
// import { fetchUsers } from '../features/auth/authSlice';

// const AdminPanel = () => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.items);
//   const { users } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchItems());
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl mb-5">Admin Panel</h1>
//       <div>
//         <h2 className="text-xl font-bold mb-3">Manage Booking Items</h2>
//         <table className="min-w-full table-auto border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Title</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Availability</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.id}>
//                 <td className="border px-4 py-2">{item.title}</td>
//                 <td className="border px-4 py-2">${item.price}</td>
//                 <td className="border px-4 py-2">
//                   {item.availability ? 'Available' : 'Unavailable'}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button className="bg-blue-500 px-3 py-1 text-white rounded">Edit</button>
//                   <button className="bg-red-500 px-3 py-1 text-white rounded ml-2">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-bold mb-3">Manage Users</h2>
//         <table className="min-w-full table-auto border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Username</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="border px-4 py-2">{user.username}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2">
//                   <button className="bg-blue-500 px-3 py-1 text-white rounded">Edit</button>
//                   <button className="bg-red-500 px-3 py-1 text-white rounded ml-2">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "../features/items/itemSlice";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../features/auth/authSlice";
import { memo, useEffect, useState } from "react";

const Modal = memo(({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});

const ItemForm = memo(({ formData, setFormData }) => (
  <>
    <div>
      <label className="block mb-1">Image Url</label>
      <input
        className="w-full border rounded px-3 py-2"
        value={formData.imageUrl}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
        }
        required
      />
    </div>
    <div>
      <label className="block mb-1">Title</label>
      <input
        className="w-full border rounded px-3 py-2"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />
    </div>
    <div>
      <label className="block mb-1">Description</label>
      <input
        className="w-full border rounded px-3 py-2"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        required
      />
    </div>
    <div>
      <label className="block mb-1">Price</label>
      <input
        className="w-full border rounded px-3 py-2"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, price: e.target.value }))
        }
        required
      />
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="availability"
        checked={formData.availability}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, availability: e.target.checked }))
        }
        className="mr-2"
      />
      <label htmlFor="availability">Available</label>
    </div>
  </>
));

const UserForm = memo(({ formData, setFormData, editingId }) => (
  <>
    <div>
      <label className="block mb-1">Username</label>
      <input
        className="w-full border rounded px-3 py-2"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        required
      />
    </div>
    <div>
      <label className="block mb-1">Email</label>
      <input
        className="w-full border rounded px-3 py-2"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
    </div>
    {!editingId && (
      <div>
        <label className="block mb-1">Password</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
      </div>
    )}
  </>
));

const AdminPanel = () => {
  const dispatch = useDispatch();
  // const { items } = useSelector((state) => state.items);
  // const { users } = useSelector((state) => state.auth);
  const items  = useSelector((state) => state.items.items);
  const users  = useSelector((state) => state.auth.users);
  const [activeTab, setActiveTab] = useState("items");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    description: "",
    title: "",
    price: "",
    availability: true,
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchUsers());
    console.log("users", users);
    console.log("items", items);
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      imageUrl: "",
      description: "",
      title: "",
      price: "",
      availability: true,
      username: "",
      email: "",
      password: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "items") {
      const itemData = {
        imageUrl: formData.imageUrl,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        availability: formData.availability,       
      };

      if (editingId) {
        dispatch(updateItem({ id: editingId, ...itemData }));
      } else {
        dispatch(addItem(itemData));
      }
    } else {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      if (editingId) {
        dispatch(updateUser({ id: editingId, ...userData }));
      } else {
        dispatch(addUser(userData));
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (data) => {
    setEditingId(data._id);
    setFormData({
      ...formData,
      ...(activeTab === "items"
        ? {
            imageUrl: data.imageUrl,
            description: data.description,
            title: data.title,
            price: data.price,
            availability: data.availability,
          }
        : { username: data.username, email: data.email }),
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log("id inside handleDelete", id);
    if (activeTab === "items") {
      dispatch(deleteItem(id));
    } else {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="mb-6 border-b">
        <div className="flex space-x-4">
          {["items", "users"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}>
              Manage {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Manage {activeTab === "items" ? "Items" : "Users"}
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New {activeTab === "items" ? "Item" : "User"}
          </button>
        </div>

        <table className="min-w-full table-auto border">
          <thead>
            <tr>
              {activeTab === "items" ? (
                <>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Availability</th>
                </>
              ) : (
                <>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                </>
              )}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            { (activeTab === "items" ? items  : users ).map((item) => {
              console.log("item", item);
              return(
              <tr key={item._id} className="hover:bg-gray-100">
                {activeTab === "items" ? (
                  <>
                    <td className="border px-4 py-2 flex justify-center"><img src={item.imageUrl} alt={item.title} width="100" height="100" /></td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                    <td className="border px-4 py-2">
                      {item.availability ? "Available" : "Unavailable"}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{item.username}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                  </>
                )}
                <td className=" border text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 cursor-pointer">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            )}) || null}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {editingId ? "Edit" : "Add New"}{" "}
            {activeTab === "items" ? "Item" : "User"}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "items" ? (
            <ItemForm formData={formData} setFormData={setFormData} />
          ) : (
            <UserForm
              formData={formData}
              setFormData={setFormData}
              editingId={editingId}
            />
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
