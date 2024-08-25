import { Button } from "@mui/base";
import React from "react";
import { Dispatch, PropsWithChildren, useState } from "react";
import { Action, State } from "./page";
import { Summoner } from "./api/route";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

interface RowTextProps {
  className: string;
  text: string;
}

function RowText({className, text}: RowTextProps) {
  return <div className={className}>
      {text}
  </div>
}

type CustomsProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function Customs({ state, dispatch }: CustomsProps) {
    const [summoners, setSummoners] = useState<Record<string, Summoner[]>>(
        {}
      );
    
      React.useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("/api");
          const { summoners } = await response.json();
          setSummoners(summoners);
        };
    
        setInterval(fetchData, 10 * 60 * 1000);
        fetchData();
      }, []);

    const handleAdd = (player: string) => {
      dispatch({ type: "ADD", player });
    };

  return (
    <div className="flex-1 mt-5 grid grid-cols-[1fr_100px_100px_150px_80px] auto-rows-[32px] gap-4 max-h-[500px] overflow-y-scroll">
      <Row>
        <div className="flex items-center">
          <span className="p-1 text-3xl">Player Name</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-3xl">Wins</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-3xl">Losses</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-yellow-500 text-3xl">Win Rate</span>
        </div>
        <div />
      </Row>

      {Object.keys(summoners).map((key) => (
        <Row key={key}>
            <RowText className="flex flex-row items-center bg-gray-500/50" text={key} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].wins} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].losses} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].winrate} />
            <Button className="p-1 bg-blue-500 rounded" onClick={() => handleAdd(key)}>
              Add
            </Button>
        </Row>
      ))}
    </div>
  );
}
