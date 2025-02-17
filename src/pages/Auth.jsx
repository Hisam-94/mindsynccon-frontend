// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, register } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Auth = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({ email: '', password: '', username: '' });
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isRegister) {
//       dispatch(register(formData));
//     } else {
//       dispatch(login({ email: formData.email, password: formData.password })).then(() => {
//         setFormData({ email: '', password: '' });
//         setIsRegister(false);
//         navigate('/');
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl mb-5">{isRegister ? 'Register' : 'Login'}</h1>
//       {error && <p className="text-red-500">{error.message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {isRegister && (
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             className="block w-full p-2 border rounded"
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="block w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="block w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
//           {loading ? 'Submitting...' : isRegister ? 'Register' : 'Login'}
//         </button>
//         <p onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">
//           {isRegister ? 'Already have an account? Login' : 'No account? Register here'}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Auth;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login, register } from '../features/auth/authSlice';

// const Auth = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({ email: '', password: '', username: '' });
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isRegister) {
//       dispatch(register(formData)).then(() => {
//         setFormData({ email: '', password: '', username: '' });
//         setIsRegister(false);
//       })

//     } else {
//       dispatch(login({ email: formData.email, password: formData.password }))
//         .then(() => {
//           setFormData({ email: '', password: '' });
//           setIsRegister(false);
//           navigate('/');
//         });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-3xl font-bold text-center text-gray-900">
//             {isRegister ? 'Create account' : 'Sign in'}
//           </h2>
//           <p className="mt-2 text-sm text-center text-gray-600">
//             {isRegister ? 'Create your account to get started' : 'Welcome back! Please sign in to continue'}
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 text-red-700 p-4 rounded-md">
//             {error.message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {isRegister && (
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 required
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="johndoe"
//               />
//             </div>
//           )}

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="john@example.com"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
//           >
//             {loading ? (
//               <div className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 {isRegister ? 'Creating account...' : 'Signing in...'}
//               </div>
//             ) : (
//               isRegister ? 'Create account' : 'Sign in'
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={() => setIsRegister(!isRegister)}
//             className="w-full text-sm text-blue-600 hover:text-blue-500 font-medium"
//           >
//             {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../features/auth/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(formData));
    } else {
      dispatch(
        login({ email: formData.email, password: formData.password })
      ).then(() => {
        navigate("/");
        setFormData({ email: "", password: "" });
        setIsRegister(false);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            {isRegister ? "Create account" : "Sign in"}
          </h2>
          {!isRegister && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Sample Admin Credentials:
              </p>
              <div className="space-y-1">
                <p className="text-sm text-blue-700">Email: john@example.com</p>
                <p className="text-sm text-blue-700">Password: 123456</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {isRegister && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="johndoe"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}>
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegister ? "Creating account..." : "Signing in..."}
              </div>
            ) : isRegister ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-sm text-blue-600 hover:text-blue-500 font-medium">
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
