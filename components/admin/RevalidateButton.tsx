"use client";

import { useState } from "react";
import { FaSync } from "react-icons/fa";
import { revalidatePages } from "@/lib/revalidate";
import RevalidationNotification from "./RevalidationNotification";

interface RevalidateButtonProps {
  className?: string;
}

export default function RevalidateButton({
  className = ""
}: RevalidateButtonProps) {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    setStatus("loading");

    try {
      const result = await revalidatePages();

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Errore sconosciuto");
    } finally {
      setIsRevalidating(false);

      // Reset dello stato dopo 5 secondi
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleRevalidate}
        disabled={isRevalidating}
        className={`flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
          isRevalidating ? "opacity-70 cursor-not-allowed" : ""
        } ${className}`}
      >
        <FaSync className={`mr-2 ${isRevalidating ? "animate-spin" : ""}`} />
        {isRevalidating ? "Rigenerando..." : "Rigenera pagine"}
      </button>

      <RevalidationNotification status={status} message={message} />
    </div>
  );
}
