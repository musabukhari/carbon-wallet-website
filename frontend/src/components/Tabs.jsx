import React, { useState } from "react";
import { motion } from "framer-motion";

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items[0].id);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`${
              activeTab === item.id ? "text-gray-900" : "text-gray-500"
            } relative px-4 py-2 text-sm font-medium focus:outline-none`}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-gray-100"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {items.map((item) =>
          activeTab === item.id ? (
            <div key={item.id}>{item.content}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;