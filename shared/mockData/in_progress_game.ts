import Game from "../Game";
import { HexCoord } from "../types";

// TODO: serializeable Game
// export type SerializedGame = Omit<Game, "createdDate" | "updatedDate"> & {
//   createdDate: string;
//   updatedDate: string;
// };

export const valid_selection = { "-2,2": 1, "0,-2": 2, "-1,2": 3, "0,0": 4, "1,-1": 5, "-3,2": 6 }

export const in_progress_game: Game = {
  id: "dpA-UG6m3vJc2wsnzsEDi",
  createdDate: new Date("2024-08-15T04:17:17.772Z"),
  deleted: false,
  difficulty: 5,
  gameOver: false,
  grid: {
    "-3,-1": {
      q: -3,
      r: -1,
      value: "c",
      capital: false,
      owner: 2,
    },
    "-3,0": {
      q: -3,
      r: 0,
      value: "",
      capital: false,
      owner: 0,
    },
    "-3,1": {
      q: -3,
      r: 1,
      value: "",
      capital: false,
      owner: 0,
    },
    "-3,2": {
      q: -3,
      r: 2,
      value: "s",
      capital: false,
      owner: 2,
    },
    "-3,3": {
      q: -3,
      r: 3,
      value: "",
      capital: false,
      owner: 2,
    },
    "-3,4": {
      q: -3,
      r: 4,
      value: "",
      capital: false,
      owner: 2,
    },
    "-2,-2": {
      q: -2,
      r: -2,
      value: "e",
      capital: false,
      owner: 2,
    },
    "-2,-1": {
      q: -2,
      r: -1,
      value: "",
      capital: true,
      owner: 0,
    },
    "-2,0": {
      q: -2,
      r: 0,
      value: "",
      capital: false,
      owner: 0,
    },
    "-2,1": {
      q: -2,
      r: 1,
      value: "",
      capital: false,
      owner: 0,
    },
    "-2,2": {
      q: -2,
      r: 2,
      value: "t",
      capital: false,
      owner: 2,
    },
    "-2,3": {
      q: -2,
      r: 3,
      value: "",
      capital: false,
      owner: 2,
    },
    "-2,4": {
      q: -2,
      r: 4,
      value: "",
      capital: false,
      owner: 2,
    },
    "-1,-2": {
      q: -1,
      r: -2,
      value: "",
      capital: false,
      owner: 0,
    },
    "-1,-1": {
      q: -1,
      r: -1,
      value: "",
      capital: false,
      owner: 0,
    },
    "-1,0": {
      q: -1,
      r: 0,
      value: "",
      capital: false,
      owner: 0,
    },
    "-1,1": {
      q: -1,
      r: 1,
      value: "c",
      capital: false,
      owner: 2,
    },
    "-1,2": {
      q: -1,
      r: 2,
      value: "a",
      capital: false,
      owner: 2,
    },
    "-1,3": {
      q: -1,
      r: 3,
      value: "d",
      capital: false,
      owner: 2,
    },
    "0,-3": {
      q: 0,
      r: -3,
      value: "p",
      capital: false,
      owner: 2,
    },
    "0,-2": {
      q: 0,
      r: -2,
      value: "r",
      capital: false,
      owner: 2,
    },
    "0,-1": {
      q: 0,
      r: -1,
      value: "",
      capital: false,
      owner: 0,
    },
    "0,0": {
      q: 0,
      r: 0,
      value: "i",
      capital: false,
      owner: 2,
    },
    "0,1": {
      q: 0,
      r: 1,
      value: "",
      capital: false,
      owner: 1,
    },
    "0,2": {
      q: 0,
      r: 2,
      value: "",
      capital: false,
      owner: 1,
    },
    "0,3": {
      q: 0,
      r: 3,
      value: "n",
      capital: false,
      owner: 2,
    },
    "1,-3": {
      q: 1,
      r: -3,
      value: "",
      capital: false,
      owner: 2,
    },
    "1,-2": {
      q: 1,
      r: -2,
      value: "i",
      capital: false,
      owner: 2,
    },
    "1,-1": {
      q: 1,
      r: -1,
      value: "l",
      capital: false,
      owner: 2,
    },
    "1,0": {
      q: 1,
      r: 0,
      value: "n",
      capital: false,
      owner: 2,
    },
    "1,1": {
      q: 1,
      r: 1,
      value: "",
      capital: false,
      owner: 1,
    },
    "1,2": {
      q: 1,
      r: 2,
      value: "",
      capital: false,
      owner: 1,
    },
    "2,-4": {
      q: 2,
      r: -4,
      value: "",
      capital: false,
      owner: 2,
    },
    "2,-3": {
      q: 2,
      r: -3,
      value: "",
      capital: false,
      owner: 2,
    },
    "2,-2": {
      q: 2,
      r: -2,
      value: "g",
      capital: false,
      owner: 2,
    },
    "2,-1": {
      q: 2,
      r: -1,
      value: "",
      capital: false,
      owner: 1,
    },
    "2,0": {
      q: 2,
      r: 0,
      value: "",
      capital: false,
      owner: 1,
    },
    "2,1": {
      q: 2,
      r: 1,
      value: "",
      capital: true,
      owner: 1,
    },
    "2,2": {
      q: 2,
      r: 2,
      value: "",
      capital: false,
      owner: 1,
    },
    "3,-4": {
      q: 3,
      r: -4,
      value: "",
      capital: false,
      owner: 2,
    },
    "3,-3": {
      q: 3,
      r: -3,
      value: "",
      capital: false,
      owner: 2,
    },
    "3,-2": {
      q: 3,
      r: -2,
      value: "h",
      capital: false,
      owner: 2,
    },
    "3,-1": {
      q: 3,
      r: -1,
      value: "",
      capital: false,
      owner: 1,
    },
    "3,0": {
      q: 3,
      r: 0,
      value: "x",
      capital: false,
      owner: 2,
    },
    "3,1": {
      q: 3,
      r: 1,
      value: "",
      capital: false,
      owner: 1,
    },
  },
  moves: [
    {
      shuffle: false,
      pass: false,
      forfeit: false,
      player: 0,
      letters: ["y", "a", "k"],
      coords: [
        {
          q: -3,
          r: 0,
        },
        {
          q: -2,
          r: 0,
        },
        {
          q: -1,
          r: -1,
        },
      ],
      grid: {
        "-3,-1": {
          q: -3,
          r: -1,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-3,0": {
          q: -3,
          r: 0,
          value: "y",
          capital: false,
          owner: 2,
        },
        "-3,1": {
          q: -3,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,2": {
          q: -3,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,3": {
          q: -3,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,4": {
          q: -3,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,-2": {
          q: -2,
          r: -2,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-2,-1": {
          q: -2,
          r: -1,
          value: "",
          capital: true,
          owner: 0,
        },
        "-2,0": {
          q: -2,
          r: 0,
          value: "a",
          capital: false,
          owner: 2,
        },
        "-2,1": {
          q: -2,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,2": {
          q: -2,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,3": {
          q: -2,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,4": {
          q: -2,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,-2": {
          q: -1,
          r: -2,
          value: "i",
          capital: false,
          owner: 2,
        },
        "-1,-1": {
          q: -1,
          r: -1,
          value: "k",
          capital: false,
          owner: 2,
        },
        "-1,0": {
          q: -1,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,1": {
          q: -1,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,2": {
          q: -1,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,3": {
          q: -1,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-3": {
          q: 0,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-2": {
          q: 0,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-1": {
          q: 0,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,0": {
          q: 0,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,1": {
          q: 0,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,2": {
          q: 0,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,3": {
          q: 0,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-3": {
          q: 1,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-2": {
          q: 1,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-1": {
          q: 1,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,0": {
          q: 1,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,1": {
          q: 1,
          r: 1,
          value: "e",
          capital: false,
          owner: 2,
        },
        "1,2": {
          q: 1,
          r: 2,
          value: "t",
          capital: false,
          owner: 2,
        },
        "2,-4": {
          q: 2,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-3": {
          q: 2,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-2": {
          q: 2,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-1": {
          q: 2,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,0": {
          q: 2,
          r: 0,
          value: "c",
          capital: false,
          owner: 2,
        },
        "2,1": {
          q: 2,
          r: 1,
          value: "",
          capital: true,
          owner: 1,
        },
        "2,2": {
          q: 2,
          r: 2,
          value: "d",
          capital: false,
          owner: 2,
        },
        "3,-4": {
          q: 3,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-3": {
          q: 3,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-2": {
          q: 3,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-1": {
          q: 3,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,0": {
          q: 3,
          r: 0,
          value: "x",
          capital: false,
          owner: 2,
        },
        "3,1": {
          q: 3,
          r: 1,
          value: "n",
          capital: false,
          owner: 2,
        },
      },
      date: new Date("2024-08-15T05:30:40.885Z"),
    },
    {
      shuffle: false,
      pass: false,
      forfeit: false,
      player: 1,
      letters: ["d", "e", "c", "e", "n", "t"],
      coords: [
        {
          q: 2,
          r: 2,
        },
        {
          q: 1,
          r: 1,
        },
        {
          q: 2,
          r: 0,
        },
        {
          q: -3,
          r: -1,
        },
        {
          q: 3,
          r: 1,
        },
        {
          q: 1,
          r: 2,
        },
      ],
      grid: {
        "-3,-1": {
          q: -3,
          r: -1,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-3,0": {
          q: -3,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-3,1": {
          q: -3,
          r: 1,
          value: "g",
          capital: false,
          owner: 2,
        },
        "-3,2": {
          q: -3,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,3": {
          q: -3,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,4": {
          q: -3,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,-2": {
          q: -2,
          r: -2,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-2,-1": {
          q: -2,
          r: -1,
          value: "",
          capital: true,
          owner: 0,
        },
        "-2,0": {
          q: -2,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-2,1": {
          q: -2,
          r: 1,
          value: "l",
          capital: false,
          owner: 2,
        },
        "-2,2": {
          q: -2,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,3": {
          q: -2,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,4": {
          q: -2,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,-2": {
          q: -1,
          r: -2,
          value: "i",
          capital: false,
          owner: 2,
        },
        "-1,-1": {
          q: -1,
          r: -1,
          value: "",
          capital: false,
          owner: 0,
        },
        "-1,0": {
          q: -1,
          r: 0,
          value: "r",
          capital: false,
          owner: 2,
        },
        "-1,1": {
          q: -1,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,2": {
          q: -1,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,3": {
          q: -1,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-3": {
          q: 0,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-2": {
          q: 0,
          r: -2,
          value: "r",
          capital: false,
          owner: 2,
        },
        "0,-1": {
          q: 0,
          r: -1,
          value: "s",
          capital: false,
          owner: 2,
        },
        "0,0": {
          q: 0,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,1": {
          q: 0,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,2": {
          q: 0,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,3": {
          q: 0,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-3": {
          q: 1,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-2": {
          q: 1,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-1": {
          q: 1,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,0": {
          q: 1,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,1": {
          q: 1,
          r: 1,
          value: "e",
          capital: false,
          owner: 2,
        },
        "1,2": {
          q: 1,
          r: 2,
          value: "t",
          capital: false,
          owner: 2,
        },
        "2,-4": {
          q: 2,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-3": {
          q: 2,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-2": {
          q: 2,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-1": {
          q: 2,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,0": {
          q: 2,
          r: 0,
          value: "c",
          capital: false,
          owner: 2,
        },
        "2,1": {
          q: 2,
          r: 1,
          value: "",
          capital: true,
          owner: 1,
        },
        "2,2": {
          q: 2,
          r: 2,
          value: "d",
          capital: false,
          owner: 2,
        },
        "3,-4": {
          q: 3,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-3": {
          q: 3,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-2": {
          q: 3,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-1": {
          q: 3,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,0": {
          q: 3,
          r: 0,
          value: "x",
          capital: false,
          owner: 2,
        },
        "3,1": {
          q: 3,
          r: 1,
          value: "n",
          capital: false,
          owner: 2,
        },
      },
      date: new Date("2024-08-15T05:30:44.412Z"),
    },
    {
      shuffle: false,
      pass: false,
      forfeit: false,
      player: 0,
      letters: ["g", "i", "r", "l", "s"],
      coords: [
        {
          q: -3,
          r: 1,
        },
        {
          q: -1,
          r: -2,
        },
        {
          q: -1,
          r: 0,
        },
        {
          q: -2,
          r: 1,
        },
        {
          q: 0,
          r: -1,
        },
      ],
      grid: {
        "-3,-1": {
          q: -3,
          r: -1,
          value: "c",
          capital: false,
          owner: 2,
        },
        "-3,0": {
          q: -3,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-3,1": {
          q: -3,
          r: 1,
          value: "g",
          capital: false,
          owner: 2,
        },
        "-3,2": {
          q: -3,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,3": {
          q: -3,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,4": {
          q: -3,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,-2": {
          q: -2,
          r: -2,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-2,-1": {
          q: -2,
          r: -1,
          value: "",
          capital: true,
          owner: 0,
        },
        "-2,0": {
          q: -2,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-2,1": {
          q: -2,
          r: 1,
          value: "l",
          capital: false,
          owner: 2,
        },
        "-2,2": {
          q: -2,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,3": {
          q: -2,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,4": {
          q: -2,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,-2": {
          q: -1,
          r: -2,
          value: "i",
          capital: false,
          owner: 2,
        },
        "-1,-1": {
          q: -1,
          r: -1,
          value: "",
          capital: false,
          owner: 0,
        },
        "-1,0": {
          q: -1,
          r: 0,
          value: "r",
          capital: false,
          owner: 2,
        },
        "-1,1": {
          q: -1,
          r: 1,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,2": {
          q: -1,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,3": {
          q: -1,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-3": {
          q: 0,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-2": {
          q: 0,
          r: -2,
          value: "r",
          capital: false,
          owner: 2,
        },
        "0,-1": {
          q: 0,
          r: -1,
          value: "s",
          capital: false,
          owner: 2,
        },
        "0,0": {
          q: 0,
          r: 0,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,1": {
          q: 0,
          r: 1,
          value: "s",
          capital: false,
          owner: 2,
        },
        "0,2": {
          q: 0,
          r: 2,
          value: "o",
          capital: false,
          owner: 2,
        },
        "0,3": {
          q: 0,
          r: 3,
          value: "n",
          capital: false,
          owner: 2,
        },
        "1,-3": {
          q: 1,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-2": {
          q: 1,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-1": {
          q: 1,
          r: -1,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,0": {
          q: 1,
          r: 0,
          value: "n",
          capital: false,
          owner: 2,
        },
        "1,1": {
          q: 1,
          r: 1,
          value: "",
          capital: false,
          owner: 1,
        },
        "1,2": {
          q: 1,
          r: 2,
          value: "",
          capital: false,
          owner: 1,
        },
        "2,-4": {
          q: 2,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-3": {
          q: 2,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-2": {
          q: 2,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-1": {
          q: 2,
          r: -1,
          value: "o",
          capital: false,
          owner: 2,
        },
        "2,0": {
          q: 2,
          r: 0,
          value: "",
          capital: false,
          owner: 1,
        },
        "2,1": {
          q: 2,
          r: 1,
          value: "",
          capital: true,
          owner: 1,
        },
        "2,2": {
          q: 2,
          r: 2,
          value: "",
          capital: false,
          owner: 1,
        },
        "3,-4": {
          q: 3,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-3": {
          q: 3,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-2": {
          q: 3,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-1": {
          q: 3,
          r: -1,
          value: "n",
          capital: false,
          owner: 2,
        },
        "3,0": {
          q: 3,
          r: 0,
          value: "x",
          capital: false,
          owner: 2,
        },
        "3,1": {
          q: 3,
          r: 1,
          value: "",
          capital: false,
          owner: 1,
        },
      },
      date: new Date("2024-08-15T05:30:58.650Z"),
    },
    {
      grid: {
        "-3,-1": {
          q: -3,
          r: -1,
          value: "c",
          capital: false,
          owner: 2,
        },
        "-3,0": {
          q: -3,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-3,1": {
          q: -3,
          r: 1,
          value: "",
          capital: false,
          owner: 0,
        },
        "-3,2": {
          q: -3,
          r: 2,
          value: "s",
          capital: false,
          owner: 2,
        },
        "-3,3": {
          q: -3,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-3,4": {
          q: -3,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,-2": {
          q: -2,
          r: -2,
          value: "e",
          capital: false,
          owner: 2,
        },
        "-2,-1": {
          q: -2,
          r: -1,
          value: "",
          capital: true,
          owner: 0,
        },
        "-2,0": {
          q: -2,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-2,1": {
          q: -2,
          r: 1,
          value: "",
          capital: false,
          owner: 0,
        },
        "-2,2": {
          q: -2,
          r: 2,
          value: "t",
          capital: false,
          owner: 2,
        },
        "-2,3": {
          q: -2,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "-2,4": {
          q: -2,
          r: 4,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,-2": {
          q: -1,
          r: -2,
          value: "",
          capital: false,
          owner: 0,
        },
        "-1,-1": {
          q: -1,
          r: -1,
          value: "",
          capital: false,
          owner: 0,
        },
        "-1,0": {
          q: -1,
          r: 0,
          value: "",
          capital: false,
          owner: 0,
        },
        "-1,1": {
          q: -1,
          r: 1,
          value: "c",
          capital: false,
          owner: 2,
        },
        "-1,2": {
          q: -1,
          r: 2,
          value: "",
          capital: false,
          owner: 2,
        },
        "-1,3": {
          q: -1,
          r: 3,
          value: "",
          capital: false,
          owner: 2,
        },
        "0,-3": {
          q: 0,
          r: -3,
          value: "p",
          capital: false,
          owner: 2,
        },
        "0,-2": {
          q: 0,
          r: -2,
          value: "r",
          capital: false,
          owner: 2,
        },
        "0,-1": {
          q: 0,
          r: -1,
          value: "",
          capital: false,
          owner: 0,
        },
        "0,0": {
          q: 0,
          r: 0,
          value: "i",
          capital: false,
          owner: 2,
        },
        "0,1": {
          q: 0,
          r: 1,
          value: "s",
          capital: false,
          owner: 2,
        },
        "0,2": {
          q: 0,
          r: 2,
          value: "o",
          capital: false,
          owner: 2,
        },
        "0,3": {
          q: 0,
          r: 3,
          value: "n",
          capital: false,
          owner: 2,
        },
        "1,-3": {
          q: 1,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "1,-2": {
          q: 1,
          r: -2,
          value: "i",
          capital: false,
          owner: 2,
        },
        "1,-1": {
          q: 1,
          r: -1,
          value: "l",
          capital: false,
          owner: 2,
        },
        "1,0": {
          q: 1,
          r: 0,
          value: "n",
          capital: false,
          owner: 2,
        },
        "1,1": {
          q: 1,
          r: 1,
          value: "",
          capital: false,
          owner: 1,
        },
        "1,2": {
          q: 1,
          r: 2,
          value: "",
          capital: false,
          owner: 1,
        },
        "2,-4": {
          q: 2,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-3": {
          q: 2,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-2": {
          q: 2,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "2,-1": {
          q: 2,
          r: -1,
          value: "o",
          capital: false,
          owner: 2,
        },
        "2,0": {
          q: 2,
          r: 0,
          value: "",
          capital: false,
          owner: 1,
        },
        "2,1": {
          q: 2,
          r: 1,
          value: "",
          capital: true,
          owner: 1,
        },
        "2,2": {
          q: 2,
          r: 2,
          value: "",
          capital: false,
          owner: 1,
        },
        "3,-4": {
          q: 3,
          r: -4,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-3": {
          q: 3,
          r: -3,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-2": {
          q: 3,
          r: -2,
          value: "",
          capital: false,
          owner: 2,
        },
        "3,-1": {
          q: 3,
          r: -1,
          value: "n",
          capital: false,
          owner: 2,
        },
        "3,0": {
          q: 3,
          r: 0,
          value: "x",
          capital: false,
          owner: 2,
        },
        "3,1": {
          q: 3,
          r: 1,
          value: "",
          capital: false,
          owner: 1,
        },
      },
      coords: [
        {
          q: 0,
          r: 1,
        },
        {
          q: 0,
          r: 2,
        },
        {
          q: 2,
          r: -1,
        },
        {
          q: 3,
          r: -1,
        },
      ],
      letters: ["s", "o", "o", "n"],
      player: 1,
      date: new Date("2024-08-15T05:31:02.415Z"),
      shuffle: false,
    },
  ],
  turn: 0,
  updatedDate: new Date("2024-08-15T05:31:04.660Z"),
  users: ["oo2AhfTgb2T_dKwaQLYvI", "AI"],
  vsAI: true,
  winner: null,
};
