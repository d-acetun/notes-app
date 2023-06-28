export type key = `${string}-${string}-${string}-${string}-${string}`;
export interface Note {
  key: key;
  content: string;
}
