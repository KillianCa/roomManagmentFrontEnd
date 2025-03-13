import { api } from "../api/api";

export interface Room {
  id: number;
  roomNumber: string;
  available: boolean;
}

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    console.log("Fetching rooms...");
    const response = await api.get("/rooms");
    console.log("Rooms got:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export const createRoom = async (roomData: {
  roomNumber: string;
  available: boolean;
}) => {
  try {
    console.log("Creating room:", roomData);
    const response = await api.post("/rooms", roomData);
    console.log("Room created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating room:", error);
    if (error.response) {
      if (error.response.status === 400) {
        return { error: "Room number already exists. Please choose another." };
      }
    }
    return { error: "Failed to create new room please try again." };
  }
};

export const updateRoom = async (
  roomId: number,
  updatedData: {
    roomNumber?: string;
    available?: boolean;
  }
) => {
  try {
    console.log(`Updating room ${roomId}:`, updatedData);
    const response = await api.put(`/rooms/${roomId}`, updatedData);
    console.log("Room updated:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating Room:", error);
    if (error.response) {
      if (error.response.status === 404) {
        return { error: "Room not found. Cannot update." };
      }
      if (error.response.status === 400) {
        return { error: "Room number already exists cannot update." };
      }
    }
    return { error: "Failed to update room please try again." };
  }
};

export const deleteRoom = async (roomId: number) => {
  try {
    console.log(`Deleting room ${roomId}`);
    await api.delete(`/rooms/${roomId}`);
    console.log("Room deleted");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting Room:", error);
    if (error.response) {
      if (error.response.status === 404) {
        return { error: "Room not found cannot delete." };
      }
    }
    return { error: "Failed to delete room please try again." };
  }
};
