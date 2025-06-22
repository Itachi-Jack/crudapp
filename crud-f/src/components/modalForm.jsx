import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  clientData,
}) {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!job.trim()) newErrors.job = "Job is required";
    if (!rate) {
      newErrors.rate = "Rate is required";
    } else if (Number(rate) < 0) {
      newErrors.rate = "Rate cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await OnSubmit({
        name: name.trim(),
        email: email.trim(),
        job: job.trim(),
        rate: Number(rate),
        isactive: status,
      });
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
      setErrors({});
      onClose();
    } catch (err) {
      console.error("Error adding client", err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isActive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode, clientData]);

  return (
    <dialog
      id="my_modal_3"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box bg-base-100/95 backdrop-blur-md shadow-2xl max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 pb-4 mb-6">
          <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
            {mode === "edit" ? (
              <>
                <svg
                  className="h-6 w-6 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </>
            ) : (
              <>
                <svg
                  className="h-6 w-6 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New
              </>
            )}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:rotate-90 transition-transform duration-200"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="form-control">
              <input
                type="text"
                placeholder="Name"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                } transition-all duration-200 focus:ring-2 ring-primary/50`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error animate-shake">
                    {errors.name}
                  </span>
                </label>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control">
              <input
                type="email"
                placeholder="Email Address"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                } transition-all duration-200 focus:ring-2 ring-primary/50`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error animate-shake">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Input */}
            <div className="form-control">
              <input
                type="text"
                placeholder="Job"
                className={`input input-bordered w-full ${
                  errors.job ? "input-error" : ""
                } transition-all duration-200 focus:ring-2 ring-primary/50`}
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              {errors.job && (
                <label className="label">
                  <span className="label-text-alt text-error animate-shake">
                    {errors.job}
                  </span>
                </label>
              )}
            </div>

            {/* Rate Input */}
            <div className="form-control">
              <input
                type="number"
                placeholder="Hourly Rate ($)"
                className={`input input-bordered w-full ${
                  errors.rate ? "input-error" : ""
                } transition-all duration-200 focus:ring-2 ring-primary/50`}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="0"
              />
              {errors.rate && (
                <label className="label">
                  <span className="label-text-alt text-error animate-shake">
                    {errors.rate}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Status Select */}
          <div className="form-control w-full max-w-xs">
            <select
              value={status ? "Active" : "Inactive"}
              onChange={handleStatusChange}
              className="select select-bordered w-full transition-all duration-200 focus:ring-2 ring-primary/50"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-base-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:bg-base-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary hover:scale-105 transform transition-all duration-200"
            >
              {mode === "edit" ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

ModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  OnSubmit: PropTypes.func.isRequired,
  clientData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    job: PropTypes.string,
    rate: PropTypes.number,
    isActive: PropTypes.bool,
  }),
};
