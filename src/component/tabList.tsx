import cn from "classnames"
import { useState } from "react"

export interface TabProps {
  name: "inProgress" | "completed",
  isActive: boolean,
}


const TABLIST: TabProps[] = [
  {
    name: "inProgress",
    isActive: true
  }, {
    name: "completed",
    isActive: false
  }
]
export  function TabList({ classNames, onTabChange }: { classNames?: string, onTabChange: (name: TabProps["name"]) => void }) {
  const [tabList, setTabList] = useState(TABLIST)
  const handleTabClick = (index: number) => {
    if (tabList[index].isActive) return;

    setTabList((prev) =>
      prev.map((tab, i) => ({
        ...tab,
        isActive: i === index,
      }))
    );
    onTabChange(tabList[index].name);
  };
  return (<div className={cn("flex items-center", classNames)}>
    {tabList.map((tab, index) => <Tab key={tab.name} index={index} tab={tab} onClick={handleTabClick}></Tab>)}
  </div>)
}

export function Tab({
  tab,
  index,
  onClick,
}: {
  tab: TabProps;
  index: number;
  onClick: (index: number) => void;
}) {
  return (
    <div
      key={tab.name}
      onClick={() => onClick(index)}
      className={cn(
        "flex items-center justify-center cursor-pointer w-[200px]  rounded-[16px_16px_0_0]  py-[8px]  ",
        tab.isActive ? "text-white  bg-gray-500 " : "text-slate-900 bg-gray-200"
      )}
    >
      {tab.name === "inProgress" ? "進行中" : "完成"}
    </div>
  );
}
