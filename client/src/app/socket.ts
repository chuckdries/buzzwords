import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import cookie from "cookie";

import { receiveSelectionSocket } from "../features/game/gameActions";
import Game from "buzzwords-shared/Game";
import { QRCoord } from "../features/hexGrid/hexGrid";
import { AppDispatch } from "./store";
import { maybeOpponentNicknameUpdated } from "../features/user/userSlice";
import {
  receiveGameUpdatedSocket,
  refresh,
} from "../features/gamelist/gamelistActions";
import { SOCKET_DOMAIN, SOCKET_PATH } from "./apiPrefix";
import { setSocketConnected } from "../features/game/gameSlice";

let socket: Socket | null = null;

interface SelectionEventProps {
  gameId: string;
  selection: { [position: QRCoord]: number };
}

// CQ: setSocketConnected
// called by getUser
export const subscribeSocket = (dispatch: AppDispatch) => {
  const cookies = cookie.parse(document.cookie);
  socket = io(SOCKET_DOMAIN, {
    withCredentials: true,
    path: SOCKET_PATH,
    extraHeaders: {
      authorization: cookies.authToken,
    },
  });
  // socket.io.on("reconnect_error", (e) => {
  //   toast("reconnect_error: " + e.message, {
  //     type: "error",
  //   });
  // });
  // socket.io.on("error", (e) => {
  //   toast("error: " + e.message, {
  //     type: "error",
  //   });
  // });
  socket.io.on("close", () => {
    dispatch(setSocketConnected(false))
  });

  socket.io.on('open', () => {
    dispatch(setSocketConnected(true))
  })

  socket.io.on("reconnect", () => {
    dispatch(refresh());
    dispatch(setSocketConnected(true))
  });

  socket.on("error", (e) => {
    toast("error: " + e, {
      type: "error",
    });
  });
  socket.on("game updated", (game: Game) => {
    dispatch(receiveGameUpdatedSocket(game));
  });
  socket.on("selection", ({ gameId, selection }: SelectionEventProps) => {
    console.log("selection", selection);
    dispatch(receiveSelectionSocket(selection, gameId));
  });
  socket.on("nickname updated", (data: { id: string; nickname: string }) => {
    dispatch(maybeOpponentNicknameUpdated(data));
  });
};

export const emitSelection = (
  selection: { [position: QRCoord]: number },
  gameId
) => {
  if (!socket) {
    console.error("cannot emit: no socket!");
    return;
  }
  console.log("emitting selection on game", gameId);
  socket.emit("selection", {
    selection,
    gameId,
  });
};
