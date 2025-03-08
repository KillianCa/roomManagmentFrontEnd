import { api } from "./api";

export const fetchUsers = async () => {
  try {
    console.log("Calling fetchUsers()...");
    const response = await api.get("/users");
    console.log("Users received:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (userData: {
  username: string;
  password: string;
  role: string;
}) => {
  try {
    console.log("Creating user:", userData);
    const response = await api.post("/users", userData);
    console.log("User created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.response) {
      if (error.response.status === 400) {
        return { error: "Username already exists. Please choose another." };
      }
    }
    return { error: "Failed to create user. Please try again." };
  }
};

export const updateUser = async (userId: number, updatedData: { username?: string; password?: string; role?: string }) => {
  try {
      console.log(`Updating user ${userId}:`, updatedData);
      const response = await api.put(`/users/${userId}`, updatedData);
      console.log("User updated:", response.data);
      return response.data;
  } catch (error: any) {
      console.error("Error updating user:", error);

      if (error.response) {
          if (error.response.status === 404) {
              return { error: "User not found. Cannot update." };
          }
          if (error.response.status === 400) {
              return { error: "Username is already taken by another user. Please choose a different name." };
          }
      }

      return { error: "Failed to update user. Please try again." };
  }
};

export const deleteUser = async (userId: number) => {
  try {
    console.log(`Deleting user ${userId}...`);
    await api.delete(`/users/${userId}`);
    console.log("User deleted successfully.");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.response) {
      if (error.response.status === 404) {
        return { error: "User not found. Cannot delete." };
      }
    }
    return { error: "Failed to delete user. Please try again" };
  }
};
