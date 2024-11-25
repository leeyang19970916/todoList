import cn from "classnames"
import React, { useState } from "react"

interface Tab {
    name: "inProgress"|"completed",
    isActive: boolean,
}


const TABLIST: Tab[] = [
    {
        name: "inProgress",
        isActive: true
    }, {
        name: "completed",
        isActive: false
    }
]



export default function TabList() {
    const [tabList, setTabList] = useState(TABLIST)
    const handleTabClick = (index: number) => {
        setTabList((prev) =>
            prev.map((tab, i) => ({
                ...tab,
                isActive: i === index,
            }))
        );
        // 要props上去 更新state 並切換列表
    };

    return (<div className="flex items-center">
        {tabList.map((tab,index) =><Tab key={tab.name} index={index} tab={tab} onClick={handleTabClick}></Tab>)}
    </div>)
}



export function Tab({
    tab,
    index,
    onClick,
  }: {
    tab: Tab;
    index: number;
    onClick: (index: number) => void;
  }) {
    return (
      <div
        key={tab.name}
        onClick={() => onClick(index)}
        className={cn(
          "w-[200px]",
          tab.isActive ? "text-blue-500" : "text-green-900"
        )}
      >
        {tab.name === "inProgress" ? "進行中" : "完成"}
      </div>
    );
  }
  