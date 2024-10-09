"use client";

import axios from "axios";

export default function () {
  const handleReserve = async () => {
    try {
      const response = await axios.post("/api/login", {
        name: "John Doe",
        date: "2023-10-01",
        time: "18:00",
      });
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="h-full w-full px-8 pb-8">
      <div className="flex items-start justify-between px-6 sm:flex-row sm:items-center">
        <div className={`w-full`}>
          <button
            onClick={handleReserve}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
