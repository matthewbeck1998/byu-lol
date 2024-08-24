import { Button } from "@mui/base";
import  { Button as MaterialButton } from "@mui/material";
import Stack from '@mui/material/Stack';
import Image from "next/image";
import { Dispatch } from "react";
import { MenuAction, MenuState } from "./page";

type HeaderProps = {
  state: MenuState;
  dispatch: Dispatch<MenuAction>;
};

export default function Header({ state, dispatch }: HeaderProps) {
  const handleSpinner = () => {
    dispatch({ type: "SPINNER" });
  };

  const handleRanked = () => {
    dispatch({ type: "RANKED" });
  };

  return (
    <div className="flex flex-row border-b-2 p-2">
      <Button>
        <Image
          src="/lol-logo.svg"
          height={72}
          width={72}
          alt="League of Legends Logo"
        />
      </Button>
      <div className="flex flex-1 p-1 items-center">
        <span className="text-4xl">{state.title}</span>
      </div>
      <Stack className="flex flex-1 p-1 items-center" spacing={2} direction="row">
        <MaterialButton style={{ width: 150 }} variant="contained" onClick={handleSpinner}>
          <span className="text-2xl">spinner</span>
        </MaterialButton>
        <MaterialButton style={{ width: 150 }} variant="contained" onClick={handleRanked}>
          <span className="text-2xl">customs</span>
        </MaterialButton>
      </Stack>
      <div className="flex flex-row-reverse flex-1 p-1 items-center">
        <Button href="https://github.com/matthewbeck1998/byu-lol">
          <Image
            src="/github-logo.svg"
            height={40}
            width={40}
            alt="GitHub Logo"
          />
        </Button>
      </div>
    </div>
  );
}
