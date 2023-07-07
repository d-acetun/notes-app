export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(
        "Your text has been copied to clipboard. Create a new file with extension .json and upload it when you want to restore your notes"
      );
    })
    .catch(() => {
      alert("An error ocurred");
    });
};
