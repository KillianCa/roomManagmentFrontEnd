import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBookings, deleteBooking } from "../services/bookingService";
import { fetchRooms } from "../services/roomService";
import { Booking } from "../services/bookingService";
import { Room } from "../services/roomService";
import "../styles/ViewMyBooking.css";
import UlImg from "../images/UL_logo.png";

const ViewMyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = 1; // Temporary user ID for testing

  useEffect(() => {
    loadBookings();
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const roomData = await fetchRooms();
    setRooms(roomData);
  };

  const loadBookings = async () => {
    const data = await fetchBookings();
    const formattedBookings = data.map((booking: any) => ({
      id: booking.id,
      userId: booking.user.id,
      roomId: booking.room.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
    setBookings(formattedBookings);
  };

  const loadUserBookings = async () => {
    const allBookings = await fetchBookings();
    const formattedBookings = allBookings.map((booking: any) => ({
      id: booking.id,
      userId: booking.user.id,
      roomId: booking.room.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));

    const userBookings = formattedBookings.filter(
      (booking: Booking) => booking.userId === userId
    );

    console.log("Filtered user bookings:", userBookings);

    setBookings(userBookings);
  };

  const getRoomNumber = (roomId: number) => {
    const room = rooms.find((room) => room.id === roomId);
    return room ? room.roomNumber : "Unknown Room";
  };

  const handleCancelBooking = async (bookingId: number) => {
    const response = await deleteBooking(bookingId);

    if (response.success) {
      setMessage("Booking canceled successfully.");
      loadUserBookings();
    } else {
      setMessage(response.error || "Failed to cancel booking.");
    }
  };

  return (
    <div className="view-rooms-container">
      <header className="header">
        <img src={UlImg} alt="College Logo" className="logo" />
        <button className="nav-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <h1 className="page-title">Your Bookings</h1>

      {message && <p className="message">{message}</p>}

      <div className="rooms-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="room-card">
              <h2>Room {getRoomNumber(booking.roomId)}</h2>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(booking.startTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(booking.endTime).toLocaleString()}
              </p>
              <button
                className="cancel-button"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default ViewMyBookings;
