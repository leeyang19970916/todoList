import cn from "classnames";
import React from "react";

interface Props {
  classNames?: string;
  value: string;
}

const DiaLog: React.FC<Props> = ({ classNames, value }) => {
    
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <span className={cn('w-[500px] text-center',classNames)}>{value}</span>
      </div>
    </div>
  );
};

export default DiaLog;
