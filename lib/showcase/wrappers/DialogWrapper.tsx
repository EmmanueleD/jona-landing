"use client";

import { useState } from "react";
import Dialog from "@/components/ui/Dialog";

/**
 * Showcase wrapper for Dialog.
 * Provides local isOpen state so the dialog can be opened/closed from the catalog.
 */
const DialogWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        Open dialog
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Dialog"
      >
        <p className="text-gray-700">
          This is an example dialog rendered in the design-system showcase.
          Click outside or press Escape to close it.
        </p>
      </Dialog>
    </div>
  );
};

export default DialogWrapper;
