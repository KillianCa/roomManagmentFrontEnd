import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRooms } from "../services/roomService";
import { fetchBookings, createBooking } from "../services/bookingService";
import "../styles/ViewRooms.css";
import UlImg from "../images/UL_logo.png";
import { Room } from "../services/roomService";
import { Booking } from "../services/bookingService";

const predefinedTimeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const ViewRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = 1; // for testing purposes

  useEffect(() => {
    loadRooms();
    loadBookings();
  }, []);

  const loadRooms = async () => {
    const data = await fetchRooms();
    setRooms(data);
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

  const checkRoomAvailability = (roomId: number) => {
    if (!selectedDate || !startTime || !endTime) return false;

    const selectedStart = new Date(`${selectedDate}T${startTime}:00`);
    const selectedEnd = new Date(`${selectedDate}T${endTime}:00`);

    return !bookings.some((booking) => {
      if (booking.roomId !== roomId) return false;

      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      return (
        (selectedStart >= bookingStart && selectedStart < bookingEnd) ||
        (selectedEnd > bookingStart && selectedEnd <= bookingEnd) ||
        (selectedStart <= bookingStart && selectedEnd >= bookingEnd)
      );
    });
  };

  const handleSearch = async () => {
    await loadBookings();
    setMessage("");
  };

  const handleBookRoom = async (roomId: number) => {
    if (!selectedDate || !startTime || !endTime) {
      setMessage("Please select a date and time before booking.");
      return;
    }

    const bookingData = {
      userId,
      roomId,
      startTime: `${selectedDate}T${startTime}:00`,
      endTime: `${selectedDate}T${endTime}:00`,
    };

    const response = await createBooking(bookingData);

    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(`Room ${roomId} booked successfully!`);
      loadBookings();
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

      <div className="time-selection">
        <h2>Select Booking Time</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value="">Start Time</option>
          {predefinedTimeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          <option value="">End Time</option>
          {predefinedTimeSlots
            .filter((time) => time > startTime)
            .map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
        </select>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <h1 className="page-title">Available Rooms</h1>
      <div className="rooms-list">
        {rooms.map((room) => {
          const isAvailable = checkRoomAvailability(room.id);
          return (
            <div key={room.id} className="room-card">
              <h2>Room {room.roomNumber}</h2>
              <p>Status: {isAvailable ? "Available" : "Occupied"}</p>
              {isAvailable ? (
                <button
                  className="book-button"
                  onClick={() => handleBookRoom(room.id)}
                >
                  Book
                </button>
              ) : (
                <button className="occupied-button" disabled>
                  Occupied
                </button>
              )}
            </div>
          );
        })}
      </div>

      <footer className="footer">Footer Content</footer>
    </div>
  );
};

export default ViewRooms;
