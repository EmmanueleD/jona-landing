"use client";

import { useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";

/**
 * Showcase wrapper for RichTextEditor.
 * Holds value/onChange state so the editor is fully functional in the catalog.
 */
const RichTextEditorWrapper = () => {
  const [value, setValue] = useState(
    "<p>Start typing to explore the rich text editor...</p>"
  );

  return (
    <div className="w-full max-w-2xl">
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder="Write something here..."
      />
    </div>
  );
};

export default RichTextEditorWrapper;
