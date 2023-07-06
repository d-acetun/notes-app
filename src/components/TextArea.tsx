import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconDragDrop, IconTrashX } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { useDebouncedValue } from "../hooks/Debounce";
import { Note, id } from "../types/types";
interface Props {
  id: id;
  content: string;
  onNoteChange: (note: Note) => void;
  deleteNote: (key: string) => void;
}
const TextArea = ({ id, content, onNoteChange, deleteNote }: Props) => {
  // const debounceRef = useRef<number>();
  const updateValue = (content: string) => onNoteChange({ id: id, content });

  const debounce = useDebouncedValue(updateValue, 500);
  const [currentValue, setCurrentValue] = useState(content);

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    debounce(event.target.value);
    setCurrentValue(event.target.value);
    // console.log("my current value", currentValue);
    // if (debounceRef.current) clearTimeout(debounceRef.current);
    // debounceRef.current = setTimeout(() => {
    //   console.log("change value", event.target.value);
    //   setNoteContent(event.target.value);
    // }, 500);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div className="grid grid-cols-[88%_12%] h-fit bg-white">
        <textarea
          name="noteContent"
          id=""
          cols={30}
          rows={10}
          className="text-black focus:outline-none resize-none"
          value={currentValue}
          onChange={handleNoteChange}
        ></textarea>
        <div>
          <IconTrashX
            onClick={() => deleteNote(id)}
            size={50}
            color={"#e27878"}
            stroke={4}
            className="hover:cursor-pointer"
          />
          <div
            title="mover"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
          >
            <IconDragDrop
              size={50}
              color={"#e27878"}
              stroke={4}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextArea;
