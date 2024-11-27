import cn from "classnames"
import React, { useState } from "react"

interface tabProps {
    name: "inProgress"|"completed",
    isActive: boolean,
}


const TABLIST: tabProps[] = [
    {
        name: "inProgress",
        isActive: true
    }, {
        name: "completed",
        isActive: false
    }
]



export default function TabList({classNames}:{classNames?:string}) {
    const [tabList, setTabList] = useState(TABLIST)
    const handleTabClick = (index: number) => {
      // 應該要有一個 如果是同樣的就return 不渲染了
        setTabList((prev) =>
          
            prev.map((tab, i) => ({
                ...tab,
                isActive: i === index,
            }))
        );
    };
    return (<div className={cn("flex items-center",classNames)}>
        {tabList.map((tab,index) =><Tab key={tab.name} index={index} tab={tab} onClick={handleTabClick}></Tab>)}
    </div>)
}



export function Tab({
    tab,
    index,
    onClick,
  }: {
    tab: tabProps;
    index: number;
    onClick: (index: number) => void;
  }) {
    return (
      <div
        key={tab.name}
        onClick={() => onClick(index)}
        className={cn(
          "flex items-center justify-center cursor-pointer w-[200px]  py-[8px]  ",
          tab.isActive ? "text-green-600 border-red-600 bg-gray-200 border-[2px]  rounded-[16px_16px_0_0]" : "text-gray-900"
        )}
      >
        {tab.name === "inProgress" ? "進行中" : "完成"}
      </div>
    );
  }
  