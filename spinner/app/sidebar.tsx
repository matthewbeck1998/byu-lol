import { Button, Input } from "@mui/base";
import { PropsWithChildren } from "react";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

function List(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="col-span-3 grid grid-cols-[1fr_auto_auto] h-full">
      {children}
    </div>
  );
}

export default function Sidebar() {
  const players = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6",
    "Player 7",
    "Player 8",
    "Player 9",
    "Player 10",
  ];

  return (
    <div className="grid grid-cols-[1fr_auto_auto] auto-rows-[50px] text-2xl p-1">
      <div className="flex flex-row items-center">
        <span className="p-1">Chosen</span>
      </div>
      <Button className="p-1 col-span-2">Spin</Button>
      {players.map((player, i) => {
        return (
          <Row key={i}>
            <div className="flex flex-row items-center">
              <span className="p-1">{player}</span>
            </div>
            <Button className="p-1">Edit</Button>
            <Button className="p-1">Delete</Button>
          </Row>
        );
      })}
      <Input className="flex p-1 items-center" slotProps={{ input: { className: "rounded" } }} />
      <Button className="p-1 col-span-2">Add</Button>
    </div>
  );
}
