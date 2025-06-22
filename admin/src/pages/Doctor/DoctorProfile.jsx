import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const { dToken, profileData, backendUrl, setProfileData, getProfileData } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        {
          fees: profileData.fees,
          address: profileData.address,
          available: profileData.available,
        },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData().then(() => setLoading(false));
    } else {
      navigate("/not-authorized");
    }
  }, [dToken]);

  return (
    <div className="mt-3 mx-5 flex flex-col gap-4">
      {loading ? (
        <>
          <div className="flex flex-row gap-5 animate-pulse">
            <div className="w-48 h-48 rounded-lg bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg px-8 py-4 bg-white max-h-[60vh] overflow-y-scroll scrollbar-hide animate-pulse">
            <div className="h-4 w-24 bg-gray-300 mb-3 rounded"></div>
            <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-5"></div>
            <div className="h-4 w-40 bg-gray-300 mb-3 rounded"></div>
            <div className="h-3 w-1/4 bg-gray-200 rounded mb-5"></div>
            <div className="h-4 w-24 bg-gray-300 mb-3 rounded"></div>
            <div className="h-3 w-1/3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
          </div>
        </>
      ) : (
        profileData && (
          <>
            <div className="flex flex-row gap-5">
              <img
                className="bg-indigo-400 w-full hidden md:block md:max-w-50 rounded-lg"
                src={profileData.image}
                alt=""
              />
              <div>
                <p className="flex items-center gap-2 text-3xl text-gray-700 font-medium">
                  {profileData.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <p>
                    {profileData.degree} - {profileData.speciality}
                  </p>
                  <button className="py-0.5 px-2 border text-xs rounded-full">
                    {profileData.experience}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 border border-gray-200 rounded-lg px-8 py-2 bg-white max-h-[60vh] overflow-y-scroll scrollbar-hide">
              <div>
                <p className="flex items-center text-sm gap-1 font-medium text-neutral-800 mt-3">
                  About:
                </p>
                <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                  {profileData.about}
                </p>
              </div>

              <p className="text-gray-600 font-medium mt-4">
                Appointment Fees:{" "}
                <span className="text-gray-800">
                  ₹{" "}
                  {isEdit ? (
                    <input
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      type="number"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>

              <div className="flex gap-2 py-2">
                <p>Address:</p>
                <p className="text-sm">
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                      value={profileData.address.line1}
                    />
                  ) : (
                    profileData.address.line1
                  )}
                  <br />
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                      value={profileData.address.line2}
                    />
                  ) : (
                    profileData.address.line2
                  )}
                </p>
              </div>

              <div className="flex gap-1 pt-2">
                <input
                  id="available-toggle"
                  onChange={(e) =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  className="cursor-pointer"
                  type="checkbox"
                />
                <label htmlFor="available-toggle">Available</label>
              </div>

              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 border border-blue-500 text-sm rounded-full mt-5 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Save Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1 border border-blue-500 text-sm rounded-full mt-5 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DoctorProfile;
