import { faFilm, faTimes, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { toggleTutorialModal } from "../game/gameSlice";
import { dismissTutorialCard } from "./gamelistActions";
import { setShowTutorialCard } from "./gamelistSlice";

const TutorialCard: React.FC<{
  hideDismiss?: boolean;
  shadow?: boolean;
}> = ({
  hideDismiss,
  shadow
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={classNames("rounded-xl bg-primary p-4 mx-2 text-text", shadow && 'shadow-xl border border-darkbrown')}>
      <h3 className="text-lg font-bold inline">How to play</h3>
      {!hideDismiss && <div className="float-right text-lg">
        <button
          className="hover:text-darkbrown mr-2"
          data-tip="Watch tutorial"
          aria-label="watch tutorial"
          onClick={() => dispatch(toggleTutorialModal())}
        >
          <FontAwesomeIcon icon={faFilm} />
        </button>
        <button
          className="hover:text-darkbrown p-1"
          data-tip="Dismiss instructions"
          aria-label="dismiss instructions"
          onClick={() => dispatch(dismissTutorialCard())}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>}
      <ul className="list-disc list-outside pl-6 text-sm">
        <li>
          <h4 className="font-bold">Spell words</h4>
          <p>Tap any letter tile on the board</p>
        </li>
        <li>
          <h4 className="font-bold">Capture tiles</h4>
          <p>
            You&apos;ll capture chains of letters that touch your territory
          </p>
        </li>
        <li>
          <h4 className="font-bold">Go for the flower</h4>
          <p>
            You get an extra turn if you destroy your opponent&apos;s flower
            tile.
          </p>
        </li>
        <li>
          <h4 className="font-bold">Wipe out your opponent to win</h4>
          <p>Good luck!</p>
        </li>
      </ul>
    </div>
  );
};

export default TutorialCard;
