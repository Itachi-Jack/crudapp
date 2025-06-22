import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function TableList({
  handleOpen,
  tableData,
  setTableData,
  searchTerm,
}) {
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        setTableData((prevData) =>
          prevData.filter((client) => client.id !== id)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredData = tableData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-error shadow-lg mb-4 animate-shake">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow-lg bg-base-100/90 backdrop-blur-sm">
          <div className="stat px-6 py-4">
            <div className="stat-figure text-primary animate-float">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="stat-title text-base-content/70 text-sm font-medium">
              Total Clients
            </div>
            <div className="stat-value text-3xl text-primary">
              {tableData.length}
            </div>
          </div>
        </div>

        <div className="stats shadow-lg bg-base-100/90 backdrop-blur-sm">
          <div className="stat px-6 py-4">
            <div className="stat-figure text-success animate-float">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-title text-base-content/70 text-sm font-medium">
              Available Now
            </div>
            <div className="stat-value text-3xl text-success">
              {tableData.filter((f) => f.isactive).length}
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-base-200/50">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-base-200/50 bg-base-200/30">
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2 text-base-content/70">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Client
                  </div>
                </th>
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  Rate
                </th>
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  Active
                </th>
                <th className="text-left font-medium text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-base-200/50 rounded-full animate-float">
                        <svg
                          className="h-12 w-12 text-base-content/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-base-content/60 font-medium">
                        No Clients found
                      </p>
                      <button
                        onClick={() => handleOpen("add")}
                        className="btn btn-primary btn-sm gap-2"
                      >
                        <svg
                          className="w-4 h-4"
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
                        Add Client
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((client, index) => (
                  <tr
                    key={client.id}
                    className="group hover:bg-base-200/50 transition-all duration-200 animate-slideIn border-b border-base-200/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="space-x-3">
                      <span className="font-mono text-sm opacity-60">
                        #{client.id}
                      </span>
                      <span className="font-medium">{client.name}</span>
                    </td>
                    <td className="text-primary/80 hover:text-primary transition-colors duration-200">
                      {client.email}
                    </td>
                    <td>
                      <span className="px-3 py-1 bg-base-200/50 rounded-full text-sm group-hover:bg-base-200/70 transition-colors duration-200">
                        {client.job}
                      </span>
                    </td>
                    <td className="font-mono">
                      <span className="text-warning font-medium">
                        ${client.rate}
                      </span>
                      <span className="text-base-content/50">/hr</span>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          client.isactive
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : "bg-warning/10 text-warning hover:bg-warning/20"
                        }`}
                      >
                        {client.isactive ? "Active" : "InActive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-all duration-200">
                        <button
                          onClick={() => handleOpen("edit", client)}
                          className="btn btn-ghost btn-sm btn-square text-primary hover:bg-primary/10"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

TableList.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
  setTableData: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
