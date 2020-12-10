import React from "react";

const User = () => {
  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <i className="fas fa-home"> Dashboard</i>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section>
      {showHeader()}
      {/* {showActionButtons()} */}
    </section>
  );
};

export default User;
