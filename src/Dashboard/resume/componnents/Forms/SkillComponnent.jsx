import React from "react";
import { Progress } from "@/components/ui/progress";

function SkillComponent({ name, value }) {
  return (
    <div className="flex items-center justify-between w-full">
      <h3>{name}</h3>
      <div className="ml-auto w-1/4"> {/* Adjust the width as needed */}
        <Progress value={value} />
      </div>
    </div>
  );
}

export default SkillComponent;
