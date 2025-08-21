import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function AddEventModal({
  isOpen,
  onClose,
  onSave,
  initial = null,       
  onDelete,             
}) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
  });

 
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        date: initial.date || "",
        time: initial.time || "",
        duration: initial.duration || "",
      });
    } else {
      setForm({ title: "", date: "", time: "", duration: "" });
    }
  }, [initial, isOpen]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.title || !form.date) return;
    onSave(form);
  };

  const footer = (
    <div className="flex justify-between">
      {initial ? (
        <button
          onClick={() => onDelete?.(initial)}
          className="btn bg-rose-500 text-white hover:bg-rose-600"
        >
          Delete
        </button>
      ) : <div />}

      <div className="flex gap-2">
        <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        <button onClick={submit} className="btn btn-primary">
          {initial ? "Save Changes" : "Save Event"}
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? "Edit Event" : "Add New Event"}
      footer={footer}
    >
      <div className="space-y-3">
        <input
          name="title"
          placeholder="Title (e.g. Team Meeting)"
          value={form.title}
          onChange={handle}
          className="w-full border rounded-lg p-2"
        />
        <div className="grid grid-cols-2 gap-3">
          <input type="date" name="date" value={form.date} onChange={handle} className="border rounded-lg p-2" />
          <input type="time" name="time" value={form.time} onChange={handle} className="border rounded-lg p-2" />
        </div>
        <input
          name="duration"
          placeholder="Duration (e.g. 1h)"
          value={form.duration}
          onChange={handle}
          className="w-full border rounded-lg p-2"
        />
      </div>
    </Modal>
  );
}
