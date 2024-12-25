import React from "react";
import { properties } from "@/style/styles";
function CategoryCard({ data }) {
  const prop=properties()
  return (
    <div>
      <div className="h-[12rem] w-[17rem] rounded-2xl border-slate-400 border-[2px] flex flex-col items-center justify-center  m-5 cursor-pointer transition-all duration-250 hover:shadow-xl p-2 gap-y-2">
       <div className="h-full w-full  rounded-xl flex flex-col items-center justify-center border-slate-400 border-[1px] bg-white "> </div>
       <div style={{fontSize:prop.fontSize.fourteen,fontWeight:prop.fontWeight.bold}}> {data?.name}</div>
      </div>
    </div>
  );
}

export default CategoryCard;
