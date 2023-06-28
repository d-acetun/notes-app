// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import TextArea from "./components/TextArea";
import { Note } from "./types/types";
const App = () => {
  const savedNotes = localStorage.getItem("Notes");
  if (!savedNotes) localStorage.setItem("Notes", "[]");

  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("Notes") || "[]")
  );

  const handleClick = () => {
    setNotes([...notes, { key: crypto.randomUUID(), content: "" }]);
  };

  const onNoteChange = ({ key: keyUpdated, content }: Note) => {
    const noteUpdatedIndex = notes.findIndex(({ key }) => key === keyUpdated);
    if (noteUpdatedIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[noteUpdatedIndex] = {
        ...updatedNotes[noteUpdatedIndex],
        content,
      };
      localStorage.setItem("Notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      // console.log("nota actualizada");
    }
  };

  const deleteNote = (key: string) => {
    const updatedNotes = notes.filter(({ key: noteKey }) => key !== noteKey);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-[#e27878] text-center text-3xl">NOTES APP</h1>
      {/* <button onClick={handleClick}>add</button> */}
      <IconPlus
        onClick={handleClick}
        size={50}
        color={"#78e29a"}
        stroke={4}
        className="hover:cursor-pointer"
      />

      <div className="flex flex-wrap gap-4 justify-center">
        {notes.map(({ key, content }) => (
          <TextArea
            key={key}
            id={key}
            content={content}
            onNoteChange={onNoteChange}
            deleteNote={deleteNote}
          ></TextArea>
        ))}
      </div>
    </div>
  );
};

export default App;
