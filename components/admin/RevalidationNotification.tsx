import { FaSync, FaCheck, FaExclamationTriangle } from "react-icons/fa";

type RevalidationStatus = "idle" | "loading" | "success" | "error";

interface RevalidationNotificationProps {
  status: RevalidationStatus;
  message?: string;
}

export default function RevalidationNotification({
  status,
  message
}: RevalidationNotificationProps) {
  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="flex items-center text-blue-600 bg-blue-50 px-4 py-2 rounded-md mt-4">
        <FaSync className="animate-spin mr-2" />
        <span>Rigenerando le pagine...</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-md mt-4">
        <FaCheck className="mr-2" />
        <span>{message || "Pagine rigenerate con successo"}</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-md mt-4">
        <FaExclamationTriangle className="mr-2" />
        <span>{message || "Errore durante la rigenerazione delle pagine"}</span>
      </div>
    );
  }

  return null;
}
