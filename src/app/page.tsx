"use client";

import axios from "axios";
import { useState } from "react";

export default function () {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleReserve = async () => {
    try {
      const response = await axios.post("/api/login", { id, pw });
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="h-full w-full px-8 pb-8">
      <div className="flex items-start justify-between px-6 sm:flex-row sm:items-center">
        <div className={`w-full`}>
          <input
            className={`border`}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className={`border`}
            placeholder="PW"
            onChange={(e) => setPw(e.target.value)}
          />
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
