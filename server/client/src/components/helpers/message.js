export const showSuccessMessage = (msg) => (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    {msg}
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export const showErrorMessage = (msg) => (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {msg}
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);
