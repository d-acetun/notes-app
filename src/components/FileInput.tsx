import { ChangeEvent } from "react";
import { Note } from "../types/types";
import { validateNoteType } from "../utils/validationTypes";

interface Props {
  saveNotes: (notes: Note[]) => void;
}

const FileInput = ({ saveNotes }: Props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || null;
    if (file && file.name.endsWith(".json")) {
      // * Creamos una instancia de FileReader.
      const reader = new FileReader();
      /*
       * Definimos la función flecha para manejar el evento de carga del FileReader.
       * Cuando se completa la lectura del archivo, el evento onload se activa y podemos acceder al contenido del archivo a través de target.result.
       * El evento onload se activa cuando se completa la lectura del archivo
       */

      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          const importedNotes = JSON.parse(content);
          if (Array.isArray(importedNotes)) {
            const correctFormat = importedNotes.every((note) =>
              validateNoteType(note)
            );
            if (correctFormat) saveNotes(importedNotes);
            else alert("¡INCORRECT FORMAT FILE!");
          }
        }
      };
      //* Iniciamos la lectura del archivo utilizando readAsText.
      reader.readAsText(file);
    }
  };
  return (
    <>
      {/* <label className="custom-file-upload"> */}
      <label className="inline-block py-[6px] px-[12px] cursor-pointer bg-[#4caf50] text-[#fff] rounded-[4px] border-none">
        <span>Import Notes</span>
        <input
          type="file"
          id="notesFile"
          name="notesFile"
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </label>
      {/* <input type="submit" value="Cargar" /> */}
    </>
  );
};

export default FileInput;
