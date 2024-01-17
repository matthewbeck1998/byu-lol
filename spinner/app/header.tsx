import { Button } from "@mui/base";

export default function Header() {
  return (
    <div className="flex flex-row p-1">
      <Button className="p-1">Logo</Button>
      <div className="flex-1 p-1">
        <span>BYU LoL Spinner</span>
      </div>
      <div className="p-1">
        <span>Links</span>
      </div>
    </div>
  );
}
