import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
function SearchField() {
  return (
    <div className="flex items-center border-2 h-[100%] border-black rounded-xl bg-white">
      <input
        className="focus:outline-none h-[100%] w-full rounded-xl px-2"
        placeholder="Search"
      />
      <Button
        color={"primary"}
        className="bg-slate-200 rounded-tr-xl h-[100%] rounded-br-xl"
      >
        <SearchIcon  sx={{ color: 'black' }} />
      </Button>
    </div>
  );
}

export default SearchField;
