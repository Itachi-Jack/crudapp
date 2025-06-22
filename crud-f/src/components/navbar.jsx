import PropTypes from "prop-types";

export default function NavBar({ onOpen, onSearch }) {
  //here onSearch is nothing but serSearchTerm
  const handleSearchChange = (event) => {
    onSearch(event.target.value); // Call the onSearch callback with the input value
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-8 py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 animate-slideDown">
      <div className="navbar-start">
        <a className="text-2xl font-bold text-primary hover:text-primary-focus transition-colors duration-200 animate-fadeIn">
          <span className="text-base-content">Client</span>Manager
        </a>
      </div>
      <div
        className="navbar-center animate-slideDown"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="form-control">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search Clients..."
              onChange={handleSearchChange}
              className="input input-bordered w-64 pr-10 transition-all duration-200 focus:w-72 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-200 animate-bounce"
              style={{ animationDuration: "2s" }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="navbar-end animate-slideDown"
        style={{ animationDelay: "0.3s" }}
      >
        <button
          onClick={onOpen}
          className="btn btn-primary gap-2 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl "
          style={{ animationDuration: "3s" }}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
