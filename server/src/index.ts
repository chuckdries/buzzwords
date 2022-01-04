import * as R from "ramda";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { nanoid } from "nanoid";
import morgan from "morgan";
import cookie from "cookie";

import getConfig from "./config";
import DL from "./datalayer";
import Game from "buzzwords-shared/Game";
import { DataLayer } from "./types";
import { HexCoord } from "buzzwords-shared/types";
import GameManager from "./GameManager";
import BannedWords from "./banned_words.json";

const config = getConfig();

let dl: DataLayer;
switch (config.dbType) {
  case "memory":
    dl = new DL.Memory();
    break;

  case "mongo":
    dl = new DL.Mongo();
    break;

  default:
    console.error("Invalid dbType", config.dbType);
    process.exit(1);
}

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser(config.cookieSecret));

app.use(async (req, res, next) => {
  const cookies = req.signedCookies || {};
  let authToken: string | null = cookies.authToken || null;
  if (!authToken) {
    const userId = nanoid();
    authToken = nanoid(40);
    await dl.createAuthToken(authToken, userId);
    res.cookie("authToken", authToken, {
      expires: new Date(253402300000000), // Approximately Friday, 31 Dec 9999 23:59:59 GMT
      signed: true,
    });
    req.signedCookies = {
      authToken,
    };
    res.locals.userId = userId;
  } else {
    const userId = await dl.getUserIdByAuthToken(authToken);
    res.locals.userId = userId;
  }
  next();
});

app.get("/healthz", (req, res) => {
  res.sendStatus(200);
});

app.get("/api/user", async (req, res) => {
  const user = res.locals.userId as string;
  const nickname = await dl.getNickName(user);
  res.send({
    id: user,
    nickname,
  });
});

app.post("/api/user/nickname", async (req, res) => {
  const user = res.locals.userId as string;
  const nickname = (req.body || {})?.nickname as string | null;
  if (!nickname) {
    res.status(400).json({
      message: "Missing nickname in request body",
    });
    return;
  }
  if (R.any((word) => nickname.toLowerCase().includes(word), BannedWords)) {
    res.status(400).json({
      message: "Nickname contains banned text",
    });
    return;
  }
  const success = await dl.setNickName(user, nickname);
  io.emit("nickname updated", {
    id: user,
    nickname,
  });
  if (success) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

app.get("/api/user/:id", async (req, res) => {
  const nickname = await dl.getNickName(req.params.id);
  res.send({
    id: req.params.id,
    nickname,
  });
});

app.get("/api/games", async (req, res) => {
  const user = res.locals.userId as string;
  const games = await dl.getGamesByUserId(user);
  res.send(games);
});

app.get("/api/game/:id", async (req, res) => {
  const gameId = req.params.id;
  const game = await dl.getGameById(gameId);
  if (game) {
    res.send(game);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/game", async (req, res) => {
  const user = res.locals.userId as string;
  const gm = new GameManager(null);
  const game = gm.createGame(user);
  try {
    await dl.saveGame(game.id, game);
    res.send(game.id);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post("/api/game/:id/join", async (req, res) => {
  const user = res.locals.userId as string;
  const gameId = req.params.id;
  const success = await dl.joinGame(user, gameId);
  const game = await dl.getGameById(gameId);
  if (game && success) {
    game.users.forEach((user) => {
      io.to(user).emit("game updated", game);
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/game/join", async (req, res) => {
  const user = res.locals.userId as string;
  const success = await dl.joinRandomGame(user);
  res.sendStatus(success ? 201 : 404);
});

app.post("/api/game/:id/move", async (req, res) => {
  const user = res.locals.userId as string;
  const gameId = req.params.id;
  const parsedMove: HexCoord[] = [];
  const move = req.body.move || [];
  for (const m of move) {
    if (typeof m == "object") {
      if (m.q && typeof m.q == "number" && m.r && typeof m.r == "number") {
        parsedMove.push({
          q: m.q,
          r: m.r,
        });
      }
    }
  }
  const session = await dl.createContext();

  const game = await dl.getGameById(gameId, {
    session,
  });
  if (game == null || game == undefined) {
    res.sendStatus(404);
    return;
  }
  const gm = new GameManager(game);

  let newGame: Game;
  try {
    newGame = gm.makeMove(user, move);
  } catch (e: unknown) {
    res.status(400);
    if (e instanceof Error) {
      res.send(e.message);
    } else {
      res.send();
    }
    return;
  }
  try {
    await dl.saveGame(gameId, newGame, {
      session,
    });
    await dl.commitContext(session);
  } catch (e) {
    res.sendStatus(500);
    return;
  }

  res.status(201);
  res.send(newGame);
  newGame.users.forEach((user) => {
    io.to(user).emit("game updated", newGame);
  });
});

interface SelectionEventProps {
  gameId: string;
  selection: { [position: string]: number };
}

io.on("connection", async (socket) => {
  const cookies = cookie.parse(socket.request.headers.cookie || "");
  const userId = await dl.getUserIdByAuthToken(
    cookies.authToken.split(".")[0].substring(2)
  );

  if (!userId) {
    return;
  }
  socket.join(userId);
  console.log("a user connected", userId);
  socket.on("selection", async ({ selection, gameId }: SelectionEventProps) => {
    const game = await dl.getGameById(gameId);
    if (!game) {
      console.log("no game", gameId);
      return;
    }
    game.users.forEach((user) => {
      io.to(user).emit("selection", { selection, gameId });
    });
  });
});

server.listen(config.port, () => {
  console.log("Server listening on port", config.port);
});
