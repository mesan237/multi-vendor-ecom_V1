<div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
  <div className="w-full">
    <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
      Audience by age
    </h3>
    <div className="flex items-center mb-2">
      <div className="w-16 text-sm font-medium dark:text-white">50+</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
          style={{ width: "18%" }}
        ></div>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-16 text-sm font-medium dark:text-white">40+</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
          style={{ width: "15%" }}
        ></div>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-16 text-sm font-medium dark:text-white">30+</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
          style={{ width: "60%" }}
        ></div>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-16 text-sm font-medium dark:text-white">20+</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
          style={{ width: "30%" }}
        ></div>
      </div>
    </div>
  </div>
  <div id="traffic-channels-chart" className="w-full"></div>
</div>;

<div className="relative bg-gray-200 p-8">
  <div className="bg-white p-4 border border-gray-300 shadow-lg rounded-lg">
    <h3 className="text-gray-800">Normal Content</h3>
    <p className="text-gray-600">This content is on a plain background.</p>
  </div>
  <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-transparent w-full h-full opacity-50 pointer-events-none"></div>
  <div className="relative mt-8 p-4 bg-blue-500 text-white border border-blue-700 shadow-lg rounded-lg">
    <h3 className="text-white">Highlighted Content</h3>
    <p className="text-white">
      This content is highlighted and stands out from the background.
    </p>
  </div>
</div>;
