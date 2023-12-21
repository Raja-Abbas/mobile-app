import React, { useState } from "react";
import Card from "./card";

function data() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-">
        <Card filter={categoryFilter} />
      </div>
    </div>
  );
}

export default data;
