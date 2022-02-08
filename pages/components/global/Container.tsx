import React from "react";

const Container = ({ children }: any) => {
  return (
    <main>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-5 px-4 sm:px-0">{children}</div>
      </div>
    </main>
  );
};

export default Container;
