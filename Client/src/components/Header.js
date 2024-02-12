import React, { useState } from "react";

export default function Header() {
  return (
    <header className="header container">
      <div className="row gap-2">
        <div className="header-logo col-sm-6">
          <h2>Attendify</h2>
        </div>
      </div>
    </header>
  );
}
