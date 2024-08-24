import { Button } from "@mui/base";
import Image from "next/image";
import React from "react";
import { Dispatch, PropsWithChildren } from "react";
import { Action, State, Team } from "./page";
import { Summoner } from "./api/route";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

interface RowFieldProps {
  team: "blue" | "red";
  role: keyof Team;
  className: string;
  text: string;
  textClassName: string;
  onClick: () => void;
  dispatch: Dispatch<Action>;
}

function RowField({team, role, className, text, textClassName, onClick, dispatch}: RowFieldProps) {
  return <div className={className} onClick={onClick}>
      <RowText className={textClassName} text={text} />
  </div>
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
    const [summoners, setSummoners] = React.useState<Record<string, Summoner[]>>(
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

  return (
    <div className="flex-1 mt-5 grid grid-cols-[1fr_100px_100px_150px] auto-rows-[32px] gap-4 max-h-[500px] overflow-y-scroll">
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
      </Row>

      {Object.keys(summoners).map((key) => (
        <Row key={key}>
            <RowText className="flex flex-row items-center bg-gray-500/50" text={key} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].wins} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].losses} />
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoners[key][0].winrate} />
        </Row>
      ))}
    </div>
  );
}
