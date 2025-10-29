// AppointmentsList.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AppointmentsList = () => {
  const { bookedAppointments } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-soft-bg font-sans py-16">
      <div className="container mx-auto">
        {/* Header - Prescripto style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-text mb-6">
            Your Appointments
          </h2>
          <p className="text-lg text-dark-text/70 font-sans leading-relaxed max-w-2xl mx-auto">
            Manage your scheduled mental health consultations and track your wellness journey.
          </p>
        </div>

        {/* Appointments List - Prescripto booking cards */}
        <div className="space-y-6">
          {bookedAppointments.length === 0 ? (
            <div className="card text-center py-16">
              <div className="text-6xl mb-6">📅</div>
              <h3 className="text-2xl font-serif font-bold text-dark-text mb-4">
                No Appointments Yet
              </h3>
              <p className="text-lg text-dark-text/70 font-sans leading-relaxed mb-8 max-w-md mx-auto">
                You haven't booked any appointments yet. Start your mental health journey by scheduling a consultation.
              </p>
              <button 
                onClick={() => navigate("/sessions")}
                className="btn-primary text-lg px-8 py-4"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            bookedAppointments.map((appointment, index) => (
              <div
                key={index}
                className="card group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Doctor Image - Prescripto style */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-accent/10 border-2 border-accent/20">
                      <img
                        className="w-full h-full object-cover"
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                      />
                    </div>
                  </div>

                  {/* Appointment Details - Prescripto style */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h3 className="text-2xl font-serif font-semibold text-dark-text mb-2">
                        Dr. {appointment.doctor.name}
                      </h3>
                      <p className="text-accent font-sans font-medium mb-4">
                        {appointment.doctor.speciality}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Location */}
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-dark-text mb-3">
                          Location
                        </h4>
                        <div className="text-dark-text/70 font-sans leading-relaxed">
                          <p>{appointment.doctor.address.line1}</p>
                          <p>{appointment.doctor.address.line2}</p>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-dark-text mb-3">
                          Appointment Details
                        </h4>
                        <div className="text-dark-text/70 font-sans leading-relaxed">
                          <p className="mb-2">
                            <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p className="mb-2">
                            <strong>Time:</strong> {appointment.time}
                          </p>
                          <p>
                            <strong>Duration:</strong> 60 minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Prescripto style */}
                  <div className="flex flex-col gap-3 lg:flex-shrink-0">
                    <button className="btn-primary">
                      View Details
                    </button>
                    <button className="btn-secondary">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions - Prescripto style */}
        {bookedAppointments.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold text-dark-text text-center mb-12">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Book New Appointment",
                  description: "Schedule a consultation with another specialist",
                  icon: "📋",
                  action: "Book Now",
                  onClick: () => navigate("/sessions")
                },
                {
                  title: "View Past Sessions",
                  description: "Access your previous consultation records",
                  icon: "📚",
                  action: "View History",
                  onClick: () => navigate("/my-appointments")
                },
                {
                  title: "Emergency Support",
                  description: "Get immediate help if you're in crisis",
                  icon: "🆘",
                  action: "Get Help",
                  onClick: () => navigate("/emergency")
                }
              ].map((action, index) => (
                <div key={index} className="card text-center group">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h4 className="text-xl font-serif font-semibold text-dark-text mb-3">
                    {action.title}
                  </h4>
                  <p className="text-dark-text/70 font-sans leading-relaxed mb-6">
                    {action.description}
                  </p>
                  <button 
                    onClick={action.onClick}
                    className="btn-secondary w-full"
                  >
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
