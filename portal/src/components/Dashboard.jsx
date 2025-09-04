import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard h-14 w-14 mx-auto mb-4" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
        </div>
        <h2 className="text-xl font-bold">Coming Soon</h2>
        <p className="text-gray-500">
          Dashboard is under development. Stay tuned for updates.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
