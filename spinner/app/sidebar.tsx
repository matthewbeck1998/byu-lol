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
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4">
        <div className="flex flex-row items-center">
          <span className="p-1 text-3xl">Chosen</span>
        </div>
        <Button className="p-1 bg-green-500 rounded">Spin</Button>
      </div>
      <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4 h-[480px] overflow-y-scroll">
        {players.map((player, i) => {
          return (
            <Row key={i}>
              <div className="flex flex-row items-center">
                <span className="p-1 text-xl">{player}</span>
              </div>
              <Button className="p-1 bg-red-500 rounded">Delete</Button>
            </Row>
          );
        })}
      </div>
      <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4">
        <Input
          className="flex items-center"
          slotProps={{ input: { className: "bg-white text-black h-full w-full rounded p-1" } }}
        />
        <Button className="p-1 bg-blue-500 rounded">Add</Button>
      </div>
    </div>
  );
}
