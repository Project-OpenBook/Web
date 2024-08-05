import React from "react";
import { Progress } from "./types"; // Progress 타입 임포트

interface TabsProps {
  selectedTab: Progress;
  onTabChange: (tab: Progress) => void;
}

export default function Tabs({ selectedTab, onTabChange }: TabsProps) {
  const tabs: Progress[] = ["진행중", "모집중", "종료된 행사"];

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-t ${
            selectedTab === tab
              ? "bg-blue-500 text-white border-blue-500 border-t-2 border-x-2"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
