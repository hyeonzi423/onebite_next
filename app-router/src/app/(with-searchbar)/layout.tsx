import { ReactNode } from "react";
import SearchBar from "../component/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}
