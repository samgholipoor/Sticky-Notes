import { useRef, useState } from 'react';
import Trash from '../icons/Trash';
import { useEffect } from 'react';
import { autoGrow, setNewOffset, setZIndex } from '../utils';

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  let mouseStartPos = {x: 0, y: 0};

  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
      autoGrow(textAreaRef);
  }, []);

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    }

    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition)
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove)
    document.removeEventListener("mouseup", mouseUp)
  };

  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return  (
    <div
      ref={cardRef}
      className="card"
      style={{
          backgroundColor: colors.colorBody,
          left: `${position.x}px`,
          top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
          <textarea
              ref={textAreaRef}
              style={{ color: colors.colorText }}
              defaultValue={body}
              onInput={() => {
                autoGrow(textAreaRef);
              }}
              onFocus={() => {
                setZIndex(cardRef.current);
              }}
          ></textarea>
      </div>
    </div>
  )
};

export default NoteCard; 