import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LiveSessions = () => {
  const { doctors = [] } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-teal-100 min-h-screen py-16 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-teal-700 mb-3 tracking-wide">
            Meet Our Mental Health Experts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our verified professionals are here to support your mental well-being. 
            Book a live session and take the first step toward a better you.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-md bg-opacity-80 border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <Link to={`/appointment/${doctor._id}`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.degree}</p>
                  <p className="text-sm text-indigo-600 mt-1 font-medium">
                    {doctor.experience} Years Experience
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Fee:</b> ₹{doctor.fees}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Speciality:</b> {doctor.speciality}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Address:</b> {doctor.address.line1}, {doctor.address.line2}
                  </p>

                  {/* Button */}
                  <div className="mt-4">
                    <Link
                      to={`/appointment/${doctor._id}`}
                      className="block text-center bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              Currently, there are no doctors available. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
