import { api } from "../api/api";

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  startTime: string;
  endTime: string;
}

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    console.log("Fetching bookings");
    const response = await api.get("/bookings");
    console.log("Bookings got", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

export const createBooking = async (bookingData: {
  userId: number;
  roomId: number;
  startTime: string;
  endTime: string;
}) => {
  try {
    console.log("Creating booking:", bookingData);
    const response = await api.post("/bookings", bookingData);
    console.log("Booking created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating booking", error);
    if (error.response) {
      if (error.response.status === 400) {
        return { error: "Room is already booked for this time." };
      }
    }
    return { error: "Failed to create booking please try again." };
  }
};

export const updateBooking = async (
  bookingId: number,
  updatedData: {
    startTime?: string;
    endtime?: string;
  }
) => {
  try {
    console.log(`Updating booking ${bookingId}:`, updatedData);
    const response = await api.put(`/bookings/${bookingId}`, updatedData);
    console.log("Booking updated:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating booking:", error);
    if (error.response) {
      if (error.response.status === 404) {
        return { error: "Booking not found, cannot update" };
      }
      if (error.response.status === 400) {
        return { error: "New time clashes with existing booking" };
      }
    }
    return { error: "Error updating booking please try again" };
  }
};

export const deleteBooking = async (bookingId: number) => {
  try {
    console.log(`Deleting booking ${bookingId}`);
    await api.delete(`/bookings/${bookingId}`);
    console.log("Booking deleted");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting the booking:", error);
    if (error.response) {
      if (error.response.status === 404) {
        return { error: "Booking not found cannot delete." };
      }
    }
    return { error: "Failed to delete booking please try again." };
  }
};
