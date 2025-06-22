import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { dashData, getDashData, dToken, cancelAppointment, completeAppointment, getAppointments } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dToken) {
      Promise.all([getAppointments(), getDashData()]).then(() => setLoading(false));
    } else {
      navigate("/not-authorized");
    }
  }, [dToken]);

  return (
    <div className="mt-3 mx-5">
      {/* Dashboard cards */}
      <div className="flex flex-wrap gap-3 mb-5">
        {
          loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="min-w-52 h-20 rounded bg-gray-200 animate-pulse" />
            ))
          ) : (
            <>
              <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                <img className="w-15" src={assets.earning_icon} alt="earning_icon" />
                <div>
                  <p className="text-xl font-semibold text-gray-600">₹ {dashData.earnings}</p>
                  <p className="text-gray-400">Earnings</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                <img className="w-15" src={assets.appointments_icon} alt="appointment_icon" />
                <div>
                  <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                  <p className="text-gray-400">Appointments</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                <img className="w-15" src={assets.patients_icon} alt="patient_icon" />
                <div>
                  <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
                  <p className="text-gray-400">Patients</p>
                </div>
              </div>
            </>
          )
        }
      </div>

      {/* Latest bookings */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-5 rounded border border-gray-200">
          <img src={assets.list_icon} alt="list_icon" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="border border-gray-200 border-t-0 overflow-y-scroll lg:max-h-[60vh] md:max-h-[50vh] sm:max-h-[30vh] scrollbar-hide">
          {
            loading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center px-6 py-4 gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 text-sm">
                    <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                  <img className="rounded-full w-10" src={item.userData.image} alt="doc_image" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{item.userData.name}</p>
                    <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex">
                      <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="cancel_icon" />
                      <img onClick={() => completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="tick_icon" />
                    </div>
                  )}
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
