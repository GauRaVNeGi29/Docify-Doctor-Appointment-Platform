import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [
        ...prev,
        timeSlots.length > 0
          ? timeSlots
          : [{ datetime: currentDate, time: null }],
      ]);
    }
    setLoading(false);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please log in to book appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.warn("Please select a valid time slot");
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
    console.log(docInfo);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading doctor info...
      </div>
    );
  }

  if (loading || !docInfo) {
  return (
    <div className="animate-pulse px-4 sm:px-0 sm:ml-72 sm:pl-4 py-10">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-gray-300 w-full sm:max-w-72 h-60 rounded-lg" />
        <div className="flex-1 border border-gray-300 rounded-lg p-8 bg-white space-y-4">
          <div className="h-6 bg-gray-300 w-1/2 rounded" />
          <div className="h-4 bg-gray-200 w-1/3 rounded" />
          <div className="h-4 bg-gray-200 w-3/4 rounded" />
          <div className="h-4 bg-gray-100 w-full rounded" />
          <div className="h-4 bg-gray-100 w-5/6 rounded" />
          <div className="h-5 bg-gray-300 w-32 rounded mt-2" />
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="flex gap-3 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-16 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="w-48 h-10 bg-gray-300 rounded-full mt-6" />
      </div>
    </div>
  );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-[var(--color-primary)] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img
              className="w-5"
              src={assets.verified_icon}
              alt="verified_icon"
            />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {" "}
              {docInfo.degree} - {docInfo.speciality}{" "}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info_icon" />{" "}
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600"><span className="font-semibold">₹</span>{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {
        docInfo.available
        ? <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 hide-scrollbar">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-[var(--color-primary)] text-white"
                    : "border border-gray-200"
                }`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 hide-scrollbar">
          {docSlots.length &&
          docSlots[slotIndex].filter((slot) => slot.time).length > 0 ? (
            docSlots[slotIndex].map(
              (item, index) =>
                item.time && (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-gray-500 border border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                )
            )
          ) : (
            <p className="text-sm font-light flex-shrink-0 px-5 py-2 text-gray-400 italic text-center">
              No slots available
            </p>
          )}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-[var(--color-primary)] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
        >
          Book an appointment
        </button>
      </div>
      : <div className="sm:ml-72 sm:pl-4 my-10">
          <p className="text-lg font-medium font-light flex-shrink-0 py-2 text-gray-400 italic">
          Not Available
          </p>
        </div>
      }
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
