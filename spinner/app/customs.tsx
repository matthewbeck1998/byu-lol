import { Button, Input } from "@mui/base";
import Image from "next/image";
import React from "react";
import { Dispatch, PropsWithChildren, useState, ChangeEvent } from "react";
import { Action, State, Team } from "./page";
import { SummonerWithName } from "./api/route";

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
    const [summoners, setSummoners] = React.useState<SummonerWithName[]>(
        []
      );

      const [onEdit, setOnEdit] = useState(false);
      const [firstEdit, setFirstEdit] = useState(true);
    
      React.useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("/api");
          const { summoners } = await response.json();
          setSummoners(summoners);
        };
    
        setInterval(fetchData, 10 * 60 * 1000);
        fetchData();
      }, []);
      
      React.useEffect(() => {
        const sendData = async () => {
          const response = await fetch("/api", { method: "POST", body: JSON.stringify({summoners: summoners}), });
          const { result } = await response.json();
          console.log(result);
        };

        if (!onEdit && !firstEdit) {
          setInterval(sendData, 10 * 60 * 1000);
          sendData();
        }
      })

    const handleAdd = (player: string) => {
      dispatch({ type: "ADD", player });
    };

    const handleInput = (index: number, field: string, e: ChangeEvent<HTMLInputElement>) => {
        setSummoners(summoners.map((summoner, i) => {
            if (i === index) {
                return { ...summoner, [field]: e.currentTarget.value };
            } else {
                return summoner;
            }
        }));
      };

    const handleEdit = () => {
      setOnEdit(!onEdit);
      if (firstEdit) {
        setFirstEdit(!firstEdit);
      }
    };

  return (
    <div>
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

      {summoners.map((summoner, i) => (
        <Row key={i}>
            {/* Not editing */}
            {!onEdit && <RowText className="flex flex-row items-center bg-gray-500/50" text={summoner.name} /> }
            {!onEdit && <RowText className="flex flex-row items-center bg-gray-500/50" text={summoner.wins} /> }
            {!onEdit && <RowText className="flex flex-row items-center bg-gray-500/50" text={summoner.losses} /> }
            {/* Editing */}
            {onEdit && <Input className="flex items-center"
                              slotProps={{
                                input: {
                                  className: "bg-white text-black h-full w-full rounded p-1",
                                },
                              }}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(i, "name", e)}
                              value={summoner.name}
                        />
            }
            {onEdit && <Input className="flex items-center"
                              slotProps={{
                                input: {
                                  className: "bg-white text-black h-full w-full rounded p-1",
                                },
                              }}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(i, "wins", e)}
                              value={summoner.wins}
                        />
            }
            {onEdit && <Input className="flex flex-row items-center bg-gray-500/50"
                              slotProps={{
                                input: {
                                  className: "bg-white text-black h-full w-full rounded p-1",
                                },
                              }}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(i, "losses", e)}
                              value={summoner.losses}
                        />
            }
            <RowText className="flex flex-row items-center bg-gray-500/50" text={summoner.winrate} />
            <Button className="p-1 bg-blue-500 rounded" onClick={() => handleAdd(summoner.name)}>
              Add
            </Button>
        </Row>
      ))}
    </div>
    <div className="flex flex-row-reverse p-2">
      <Button className="p-1 bg-green-500 rounded" style={{ width: 80 }} onClick={handleEdit} >
        Edit
      </Button>
    </div>
    </div>
  );
}
