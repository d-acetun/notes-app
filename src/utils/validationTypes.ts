import { Note } from "../types/types";

export const validateNoteType = (obj: any): obj is Note => {
  return (
    "id" in obj &&
    "content" in obj &&
    typeof obj.id === "string" &&
    typeof obj.content === "string"
  );
};
