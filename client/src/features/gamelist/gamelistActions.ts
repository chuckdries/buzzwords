import * as R from "ramda";
import { toast } from "react-toastify";

import { AppThunk, RootState } from "../../app/store";
import {
  deleteGame,
  refreshReceived,
  setGameLoading,
  setIsRefreshing,
  shiftGameStateModalQueueForGame,
  updateGame,
} from "./gamelistSlice";
import Game, { ShallowGame } from "buzzwords-shared/Game";
import { opponentReceived, User } from "../user/userSlice";
import { getAllUsers } from "../user/userSelectors";
import { fetchOpponent } from "../user/userActions";
import { getApiUrl } from "../../app/apiPrefix";
import { GameStateModalType } from "../game/GameStateModal";
import {
  resetSelection,
  setGameStateModal,
  toggleNudgeButton,
} from "../game/gameSlice";
import { initiateReplay, maybeShowNudge } from "../game/gameActions";

import chord from "../../../assets/fmajor-pleasant.m4a?url";
import { batch } from "react-redux";
import { Api } from "../../app/Api";

const gameUpdateEventGetGameStateModalType = (
  game: Game,
  state: RootState
): GameStateModalType | null => {
  let gameStateModalType: GameStateModalType | null = null;
  if (game.moves.length === 0) {
    return null;
  }
  if (game.moves[game.moves.length - 1].player === game.turn) {
    gameStateModalType = game.turn === 0 ? "extra-turn-p1" : "extra-turn-p2";
  }
  if (game.gameOver) {
    const selfUser = state.user.user?.id;
    const userIndex = game.users.findIndex((userId) => selfUser === userId);
    if (userIndex > -1) {
      gameStateModalType = game.winner === userIndex ? "victory" : "defeat";
    }
  }
  return gameStateModalType;
};

export const refresh = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsRefreshing(true));
  try {
    const response = await Api.get<{
      games: ShallowGame[];
      users: User[];
    }>(getApiUrl("/game"));

    const gamesById: { [id: string]: ShallowGame } = {};
    response.data.games.forEach((game) => {
      gamesById[game.id] = game;
    }, {});

    Object.values(response.data.users).forEach((u) =>
      dispatch(opponentReceived(u))
    );
    dispatch(refreshReceived(gamesById));
  } catch (e) {
    toast(e.response?.data?.message ?? e.toString(), { type: "error" });
  }
};

const DingAudio = new Audio(chord);

export const receiveGameUpdatedSocket =
  (game: Game): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const userIndex = game.users.findIndex(
      (user) => user === state.user.user?.id
    );
    if (
      userIndex === game.turn &&
      !game.gameOver &&
      !state.game.turnNotificationsMuted
    ) {
      DingAudio.play();
    }

    const allKnownPlayersWithNicknames = R.pipe(
      R.filter((player: User) => Boolean(player.nickname)),
      R.keys
    )(getAllUsers(state));
    const missingPlayers = R.difference(
      game.users,
      allKnownPlayersWithNicknames
    );
    if (missingPlayers.length) {
      missingPlayers.forEach((missingPlayer) => {
        dispatch(fetchOpponent(missingPlayer));
      });
    }

    if (game.vsAI && game.turn === 1) {
      const { id, moves } = game;
      const turnNumber = moves.length;
      setTimeout(() => {
        dispatch(maybeShowNudge(id, turnNumber));
      }, 20000);
    }
    if (game.vsAI && game.turn === 0) {
      dispatch(toggleNudgeButton(false));
    }

    const gameStateModalType = game
      ? gameUpdateEventGetGameStateModalType(game, state)
      : null;
    if (state.game.currentGame === game.id) {
      dispatch(resetSelection());
    }
    if (state.game.currentGame === game.id && state.game.windowHasFocus) {
      batch(() => {
        dispatch(
          updateGame({
            game,
            gameStateModalToQueue: null,
          })
        );
        if (game.vsAI && game.moves[game.moves.length - 1].player === 1) {
          dispatch(initiateReplay(game.moves.length - 1, true));
        }
      });
      if (gameStateModalType) {
        dispatch(
          setGameStateModal({
            type: gameStateModalType,
          })
        );
      }
      return;
    }

    dispatch(
      updateGame({
        game,
        gameStateModalToQueue: gameStateModalType,
      })
    );
  };

export const dequeueOrDismissGameStateModalForGame =
  (gameId: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setGameStateModal(null));
    const state = getState();
    const game = state.gamelist.games[gameId];
    const gameStateModalToShow = state.gamelist.gameMetas[gameId]?.queuedGameStateModals[0];
    if (gameStateModalToShow) {
      dispatch(shiftGameStateModalQueueForGame(gameId));
      dispatch(
        setGameStateModal({
          type: gameStateModalToShow,
        })
      );
    }
  };

export const markGameAsSeen =
  (gameId: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(dequeueOrDismissGameStateModalForGame(gameId));
  };

export const createNewGame = (): AppThunk => async (dispatch) => {
  try {
    const res = await Api.post<string>(getApiUrl("/game"));
    await dispatch(refresh());
    return res.data;
  } catch (e) {
    if (e.response?.data?.message) {
      toast(e.response.data.message);
    }
    throw e.response?.data ?? e.toString();
  }
};

export const createNewAIGame =
  (difficulty: number): AppThunk =>
  async (dispatch) => {
    try {
      const res = await Api.post<string>(getApiUrl("/game"), {
        vsAI: true,
        difficulty,
      });
      await dispatch(fetchGameById(res.data));
      return res.data;
    } catch (e) {
      if (e.response?.data?.message) {
        toast(e.response.data.message);
      }
      throw e.response?.data ?? e.toString();
    }
  };

export const joinGameById =
  (id: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    try {
      const res = await Api.post(getApiUrl("/game", id, "join"));
      if (res.data === "Not Found") {
        return false;
      }
      dispatch(refresh());
      return true;
    } catch (e) {
      // throw e.response?.data ?? e.toString();
      toast(e.response?.data ?? e.toString(), { type: "error" });
      return false;
    }
  };

export const deleteGameById =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    try {
      await Api.post(getApiUrl("/game", id, "delete"));
      dispatch(deleteGame(id));
    } catch (e) {
      toast(e.response?.data ?? e, { type: "error" });
    }
  };

export const getTutorialCardSetting = () =>
  JSON.parse(
    localStorage.getItem("turnNotificationsMute") || "false"
  ) as boolean;

export const setTutorialCardSetting = (mute: boolean) =>
  localStorage.setItem("turnNotificationsMute", JSON.stringify(mute));

export const fetchGameById =
  (id: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    dispatch(setGameLoading({ id, loading: "loading" }));
    try {
      const { data } = await Api.get<Game>(getApiUrl("/game", id));
      dispatch(
        updateGame({
          game: data,
          gameStateModalToQueue: null,
        })
      );
    } catch (e) {
      if (e.response?.status === 404) {
        dispatch(
          setGameLoading({
            id,
            loading: "loaded",
          })
        );
        return false;
      }
      toast(e.response?.data ?? e, { type: "error" });
      return false; // this is a bug. it will result in showing a 404 page when the request fails due to network errors. I don't care
    }
    dispatch(
      setGameLoading({
        id,
        loading: "loaded",
      })
    );
    return true;
  };
