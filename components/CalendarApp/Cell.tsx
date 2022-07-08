import React = require('react');

export interface CellProps {
  classes: string;
  day: string;
  noteCount: number;
  clickFunc: Function;
}

export default function Cell(props: CellProps) {
  let noteDisplay = null;

  if (props.noteCount > 0) {
    noteDisplay = <p>({props.noteCount})</p>;
  }

  return (
    <button
      type="button"
      className={'flex-ele ' + props.classes}
      onClick={() => {
        props.clickFunc();
      }}
    >
      <div className="flex-sub-ele">
        <h2>{props.day}</h2>
      </div>
      <div className="flex-sub-ele">{noteDisplay}</div>
    </button>
  );
}
