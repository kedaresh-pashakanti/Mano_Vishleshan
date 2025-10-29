import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([
    {
      _id: "doc10",
      name: "Dr. Renu Singh",
      image: "images/doc10.jpg",
      speciality: "Psychiatrist",
      degree: "MBBS, MD",
      experience: "10 Years",
      fees: 1000,
      address: {
        line1: "AIIMS Delhi",
        line2: "New Delhi",
      },
    },
    {
      _id: "doc2",
      name: "Dr. Kavita Sharma",
      image: "images/doc11.jpg",
      speciality: "Clinical Psychologist",
      degree: "PhD Psychology",
      experience: "8 Years",
      fees: 900,
      address: {
        line1: "NIMHANS",
        line2: "Bangalore",
      },
    },
    {
      _id: "doc3",
      name: "Dr. Meera Desai",
      image: "images/doc12.jpg",
      speciality: "Neuropsychiatrist",
      degree: "MBBS, MD",
      experience: "7 Years",
      fees: 1100,
      address: {
        line1: "J.J. Hospital",
        line2: "Mumbai",
      },
    },
    {
      _id: "doc4",
      name: "Dr. Rajesh Verma",
      image: "images/doc7.png",
      speciality: "Psychiatrist",
      degree: "MBBS, MD",
      experience: "12 Years",
      fees: 1200,
      address: {
        line1: "Fortis Hospital",
        line2: "Gurgaon",
      },
    },
    {
      _id: "doc5",
      name: "Dr. Arjun Nair",
      image: "images/doc8.jpg",
      speciality: "Counseling Psychologist",
      degree: "MPhil Psychology",
      experience: "9 Years",
      fees: 850,
      address: {
        line1: "Apollo Hospitals",
        line2: "Chennai",
      },
    },
    {
      _id: "doc6",
      name: "Dr. Sandeep Mishra",
      image: "images/doc9.jpg",
      speciality: "Psychotherapist",
      degree: "MSc Clinical Psychology",
      experience: "6 Years",
      fees: 750,
      address: {
        line1: "AIIMS Patna",
        line2: "Patna",
      },
    },
  ]);

  const [bookedAppointments, setBookedAppointments] = useState([]);

  const addBookedAppointment = (appointment) => {
    setBookedAppointments((prevAppointments) => [
      ...prevAppointments,
      appointment,
    ]);
  };

  const cancelAppointment = (index) => {
    setBookedAppointments((prevAppointments) =>
      prevAppointments.filter((_, i) => i !== index)
    );
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        bookedAppointments,
        addBookedAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
