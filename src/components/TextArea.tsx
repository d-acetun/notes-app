import { ChangeEvent, useState } from "react";
import { useDebouncedValue } from "../hooks/Debounce";
import { Note, key } from "../types/types";
import { IconTrashX } from "@tabler/icons-react";

interface Props {
  id: key;
  content: string;
  onNoteChange: (note: Note) => void;
  deleteNote: (key: string) => void;
}
const TextArea = ({ id, content, onNoteChange, deleteNote }: Props) => {
  // const debounceRef = useRef<number>();
  const updateValue = (content: string) => onNoteChange({ key: id, content });

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

  return (
    <div className="flex border bg-white h-fit">
      <textarea
        name="noteContent"
        id=""
        cols={30}
        rows={10}
        className="text-black focus:outline-none resize-none"
        value={currentValue}
        onChange={handleNoteChange}
      ></textarea>
      <IconTrashX
        onClick={() => deleteNote(id)}
        size={50}
        color={"#e27878"}
        stroke={4}
        className="hover:cursor-pointer"
      />
    </div>
  );
};

export default TextArea;
