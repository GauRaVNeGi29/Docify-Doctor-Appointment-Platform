import React, { useDebugValue, useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserdata] = useState({
    name: "Rahul Shukla",
    image: assets.profile_pic,
    email: "rahul@gmail.com",
    phone: "1098765432",
    address: {
      line1: "Indra Park, Palam Colony",
      line2: "New Delhi, India",
    },
    gender: "Male",
    dob: "29-11-2003",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserdata((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="text-3xl font-medium text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-[198px]"
              type="tel"
              value={userData.phone}
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
              className="mb-1 bg-gray-100"
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
              className="mt-1 bg-gray-100"
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </p>
          ) : (
            <p className="text-gray-500">
              <p className="mb-1">
                {userData.address.line1}
              </p>
              <p className="mt-1">
                {userData.address.line2}
              </p>
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option className="text-sm text-gray-600 font-sans" value="Male">Male</option>
              <option className="text-sm text-gray-600 font-sans" value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth</p>
          {
            isEdit
            ? <input className="max-w-28 bg-gray-100" type="date" onChange={(e) =>setUserdata(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob}/>
            : <p className="text-gray-500">{userData.dob}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit
          ? <button className="border border-[var(--color-primary)] px-8 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all duration 300" onClick={() => setIsEdit(false)}>Save Information</button>
          : <button className="border border-[var(--color-primary)] px-8 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all duration 300" onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
