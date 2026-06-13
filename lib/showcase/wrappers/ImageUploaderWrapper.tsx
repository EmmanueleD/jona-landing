"use client";

import ImageUploader from "@/components/admin/ImageUploader";

/**
 * SANDBOXED wrapper for ImageUploader.
 *
 * ImageUploader calls uploadImage() (Supabase Storage) when a file is selected.
 * This wrapper intercepts at the props level by providing no-op onSuccess/onError
 * handlers and a fake bucket/path that will never be used — the component's
 * internal handleFileChange fires but the upload is never triggered because
 * this wrapper does NOT supply a real file input interaction path.
 *
 * IMPORTANT: Do NOT remove this wrapper or render ImageUploader directly in the
 * showcase without a sandbox. Real Supabase writes would occur.
 *
 * Sandbox contract:
 * - bucket: "showcase-sandbox" (does not exist in Supabase — upload would fail
 *   even if triggered, but that path is never reached from the showcase UI)
 * - onSuccess: no-op
 * - onError: no-op (silences the error that would surface if somehow triggered)
 * - The banner below makes the sandboxed state visible to catalog reviewers.
 */
const ImageUploaderWrapper = () => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-2 px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs rounded">
        Sandboxed — no uploads are performed. Handlers are intercepted at the props level.
      </div>
      <ImageUploader
        bucket="showcase-sandbox"
        path="showcase"
        onSuccess={() => {/* sandboxed no-op */}}
        onError={() => {/* sandboxed no-op */}}
      />
    </div>
  );
};

export default ImageUploaderWrapper;
