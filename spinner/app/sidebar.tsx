import { Button, Input } from "@mui/base";
import { ChangeEvent, Dispatch, PropsWithChildren, useState } from "react";
import { Action, State } from "./page";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

type SidebarProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function Sidebar({ state, dispatch }: SidebarProps) {
  const [player, setPlayer] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.currentTarget.value);
  };

  const handleSpin = () => {
    dispatch({ type: "SPIN" });
  };

  const handleAdd = () => {
    dispatch({ type: "ADD", player });
    setPlayer("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4">
        <div className="flex flex-row items-center bg-gray-500/50">
          <span className="p-1 text-3xl">{state.chosen}</span>
        </div>
        <Button className="p-1 bg-green-500 rounded" onClick={handleSpin}>
          Spin
        </Button>
      </div>
      {state.players.length > 0 && (
        <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4 max-h-[464px] overflow-y-scroll">
          {state.players.map((player, index) => {
            const handleDelete = () => {
              dispatch({ type: "DELETE", index });
            };

            return (
              <Row key={index}>
                <div className="flex flex-row items-center bg-gray-500/50">
                  <span className="p-1 text-xl">{player}</span>
                </div>
                <Button
                  className="p-1 bg-red-500 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Row>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-[1fr_80px] auto-rows-[32px] gap-4">
        <Input
          className="flex items-center"
          slotProps={{
            input: {
              className: "bg-white text-black h-full w-full rounded p-1",
            },
          }}
          onChange={handleInput}
          value={player}
        />
        <Button className="p-1 bg-blue-500 rounded" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
}
