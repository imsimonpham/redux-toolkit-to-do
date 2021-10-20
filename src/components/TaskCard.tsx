import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";

interface TaskCardType {
  task: string;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardType) => {
  const dispatch = useDispatch();

  const [doneBtnText, setDoneBtnText] = useState("Done");

  //add line through on task text
  const textRef = useRef<HTMLParagraphElement>(null);
  const [doneBtnClicked, setDoneButtonClicked] = useState(false);

  //editable
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (doneBtnClicked) {
      textRef.current?.classList.add("line-through");
      setDoneBtnText("UnDone");
    } else {
      textRef.current?.classList.remove("line-through");
      setDoneBtnText("Done");
    }
  }, [doneBtnClicked]);

  useEffect(() => {
    if (editable) {
      textRef.current?.focus();
    }
  }, [editable]);

  return (
    <div className="task">
      <p
        className="text"
        ref={textRef}
        contentEditable={editable}
        suppressContentEditableWarning={true}
      >
        {task}
      </p>
      <div className="btn-group">
        <button
          className="edit"
          onClick={(e) => {
            setEditable(!editable);
          }}
        >
          Edit
        </button>
        <button
          className="done"
          onClick={(e) => {
            setDoneButtonClicked(!doneBtnClicked);
          }}
        >
          {doneBtnText}
        </button>
        <button
          className="delete"
          onClick={(e) => {
            dispatch(removeTodo(index));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
