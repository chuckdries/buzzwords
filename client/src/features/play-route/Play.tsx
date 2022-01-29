import React, { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { Link, useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faHistory,
  faPlay,
  faPlayCircle,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useHotkeys from "@reecelucas/react-use-hotkeys";

import { RootState } from "../../app/store";
import {
  clearReplay,
  setCurrentGame,
  toggleNudgeButton,
} from "../game/gameSlice";
import {
  deleteGameById,
  dequeueOrDismissGameStateModalForGame,
  joinGameById,
  markGameAsSeen,
} from "../gamelist/gamelistActions";
import GameBoard from "../game/GameBoard";
import CopyToClipboard from "../../presentational/CopyToClipboard";
import NicknameModal from "../user/NicknameModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { nudgeGameById, submitMove } from "../game/gameActions";
import classNames from "classnames";
import Button from "../../presentational/Button";
import GameStateModal from "../game/GameStateModal";
import MoveListItem from "./MoveListItem";

const Play: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const game = useSelector((state: RootState) =>
    id ? state.gamelist.games[id] : null
  );
  const gamesLoaded = useSelector(
    (state: RootState) => state.gamelist.gamesLoaded
  );
  const currentUser = useSelector((state: RootState) => state.user.user);
  const replayState = useAppSelector((state) =>
    Boolean(state.game.replay.move)
  );
  const gameStateModal = useAppSelector((state) => state.game.gameStateModal);
  const showingNudgeButton = useAppSelector(
    (state) => state.game.showingNudgeButton
  );
  const socketConnected = useAppSelector((state) => state.game.socketConnected);

  const [fourohfour, setFourohfour] = useState(false);

  const userIndex =
    game && currentUser
      ? game.users.findIndex((val) => val === currentUser.id)
      : null;

  useHotkeys("Enter", () => {
    if (id) {
      dispatch(submitMove(id));
    }
  });

  useEffect(() => {
    if (id) {
      console.log("set current game", id);
      dispatch(setCurrentGame(id));
      dispatch(markGameAsSeen(id));
    }
    return () => {
      dispatch(setCurrentGame(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (gamesLoaded && !game && id) {
      dispatch(joinGameById(id)).then((joinedGame) => {
        if (!joinedGame) {
          setFourohfour(true);
        }
      });
    } else {
      setFourohfour(false);
    }
  }, [id, dispatch, game, gamesLoaded]);

  useEffect(() => {
    if (
      gamesLoaded &&
      game &&
      game.vsAI &&
      game.turn === 1 &&
      game.moves.length > 1 &&
      !game.gameOver
    ) {
      const move = game.moves[game.moves.length - 1];
      if (
        move.date &&
        new Date().getTime() - new Date(move.date).getTime() > 10000
      ) {
        dispatch(toggleNudgeButton(true));
      }
    }
  }, [gamesLoaded, game, dispatch]);

  const onNudgeClick = useCallback(() => {
    if (!id) {
      return;
    }
    try {
      dispatch(nudgeGameById(id));
      dispatch(toggleNudgeButton(false));
    } catch (e) {
      toast(e, {
        type: "error",
      });
    }
  }, [dispatch, id]);

  const nickModal =
    currentUser && !currentUser.nickname ? <NicknameModal /> : null;

  if (fourohfour) {
    return (
      <div className="flex flex-auto flex-col h-screen justify-center items-center">
        <h1>404</h1>
        <Link className="underline text-blue-700" to="/">
          home
        </Link>
      </div>
    );
  }

  if (game && game.users.length === 1) {
    return (
      <div className="flex flex-auto flex-col overflow-auto lg:h-screen justify-center items-center py-12 px-4">
        <div className="max-w-full flex-shrink-0 bg-darkbg flex flex-col justify-center items-center text-center p-8 rounded-xl mb-5">
          <h2 className="text-2xl flex-wrap">
            Invite an opponent to start the game
          </h2>
          <span>they can use this link to join you</span>
          <a
            className="underline text-blue-700 text-sm break-words"
            href={window.location.toString()}
          >
            {window.location.toString()}
          </a>
          <div>
            <CopyToClipboard
              label="Copy link"
              text={window.location.toString()}
            />
            {navigator.share && (
              <Button
                onClick={() => {
                  navigator.share?.({
                    url: window.location.toString(),
                  });
                }}
              >
                Share <FontAwesomeIcon icon={faShare} />{" "}
              </Button>
            )}
            {id && (
              <Button
                className="bg-red-600 text-white"
                onClick={() => {
                  dispatch(deleteGameById(id));
                  navigate('/');
                }}
              >
                <FontAwesomeIcon className="mr-2" icon={faTrash} />
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className=" bg-darkbg rounded-xl text-center">
          <h2 className="text-2xl">Watch the tutorial</h2>
          <span>in the mean time</span>
          <iframe
            style={{
              maxWidth: "100%",
              width: "560px",
            }}
            height="315"
            src="https://www.youtube.com/embed/MwULUSGQ9oo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-darkbrown border-2 rounded-lg"
          ></iframe>
        </div>
        {nickModal}
      </div>
    );
  }

  return (
    <div className="flex flex-auto flex-col lg:flex-row">
      <div className="absolute top-1 right-1 text-sm bg-lightbg">
        <span className="mr-1">
          {socketConnected ? "online" : "disconnected"}
        </span>
        <FontAwesomeIcon
          className={socketConnected ? "text-green-400" : "text-gray-400"}
          icon={faCircle}
        />
      </div>
      {game && id && userIndex !== null && (
        <GameBoard id={id} game={game} userIndex={userIndex} />
      )}
      {game && id && (
        <div className="m-auto lg:m-0 flex-shrink-0 w-[200px] pt-2 lg:max-h-screen overflow-y-auto">
          {showingNudgeButton && (
            <div className="p-2 rounded-xl bg-primary flex flex-col mr-2">
              <p>Looks like the AI opponent is taking a long time to move</p>
              <Button
                onClick={onNudgeClick}
                className="text-white bg-darkbrown"
              >
                Nudge the bot
              </Button>
            </div>
          )}
          <div className="flex flex-shrink-0 items-center text-darkbrown pt-2">
            <button
              onClick={() => {
                if (replayState) {
                  return dispatch(clearReplay());
                }
              }}
            >
              <FontAwesomeIcon
                className={classNames(
                  "mx-1 text-xl",
                  replayState && "text-blue-500 hover:text-red-500"
                )}
                icon={replayState ? faPlayCircle : faHistory}
              />
            </button>
            <h3 className="flex-auto">
              <span className="text-2xl font-bold m-0">Turns</span>
            </h3>
          </div>
          <ul className="">
            {R.reverse(game.moves).map((move, i) => {
              const index = game.moves.length - i - 1;
              return <MoveListItem move={move} index={index} key={index} />;
            })}
          </ul>
        </div>
      )}
      {nickModal}
      {gameStateModal && id && (
        <GameStateModal
          {...gameStateModal}
          onDismiss={() => dispatch(dequeueOrDismissGameStateModalForGame(id))}
        />
      )}
    </div>
  );
};

export default Play;
