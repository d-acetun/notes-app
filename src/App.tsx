// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import TextArea from "./components/TextArea";
import { Note } from "./types/types";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const App = () => {
  const savedNotes = localStorage.getItem("Notes");
  if (!savedNotes) localStorage.setItem("Notes", "[]");

  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("Notes") || "[]")
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleClick = () => {
    setNotes([...notes, { id: crypto.randomUUID(), content: "" }]);
  };

  const onNoteChange = ({ id: keyUpdated, content }: Note) => {
    const noteUpdatedIndex = notes.findIndex(
      ({ id: key }) => key === keyUpdated
    );
    if (noteUpdatedIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[noteUpdatedIndex] = {
        ...updatedNotes[noteUpdatedIndex],
        content,
      };
      localStorage.setItem("Notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    }
  };

  const deleteNote = (key: string) => {
    const updatedNotes = notes.filter(({ id: noteKey }) => key !== noteKey);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNotes((notes) => {
        // * indice inicial desde donde se movió
        const oldIndex = notes.findIndex((note) => active.id === note.id);
        // * indice al que fue colocado
        const newIndex = notes.findIndex((note) => over?.id === note.id);
        const newOrder = arrayMove(notes, oldIndex, newIndex);
        localStorage.setItem("Notes", JSON.stringify(newOrder));
        return newOrder;
      });
    }
  };

  return (
    <div className="px-10 mt-5">
      <h1 className="text-[#e27878] text-center text-3xl">NOTES APP</h1>
      <IconPlus
        onClick={handleClick}
        size={50}
        color={"#78e29a"}
        stroke={4}
        className="hover:cursor-pointer mb-2"
      />

      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={notes}
            // strategy={horizontalListSortingStrategy}
          >
            {notes.map(({ id: key, content }) => (
              <TextArea
                key={key}
                id={key}
                content={content}
                onNoteChange={onNoteChange}
                deleteNote={deleteNote}
              ></TextArea>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default App;
