import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
// import "./RTELinks.js";
import conf from "../conf/conf.js";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // control will come form react hook form and its responsible to take all the state of this to the form which is been called

  /**
   * Rich Text Editor (RTE) component integrated with React Hook Form.
   *
   * @param {string} name - Unique identifier for the form field (default: "content").
   * @param {object} control - React Hook Form's control object for state management.
   * @param {string} label - Optional label displayed above the editor.
   * @param {string} defaultValue - Initial content for the editor (default: empty string).
   *
   * Features:
   * - Uses TinyMCE Editor with a preconfigured toolbar and plugins.
   * - Syncs editor content with React Hook Form via the `Controller` component.
   * - Supports images, tables, formatting, and more.
   * - Responsive design (full-width container).
   */
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinyMCEAPIKEY}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

// Key Points Covered:
// Purpose: Identifies it as a form-integrated rich text editor.
// Parameters: Explains each prop’s role.
// Integration: Highlights the React Hook Form (control) and TinyMCE connection.
// Features: Lists key editor capabilities.
// Defaults: Notes fallback values.

// This helps future developers (including yourself!) quickly grasp:
// What the component does
// How to use it (props)
// Underlying technologies (TinyMCE + React Hook Form)
// Default behavior
