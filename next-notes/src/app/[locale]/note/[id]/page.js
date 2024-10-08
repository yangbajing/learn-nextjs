import Note from "@/components/Note";
import { getNote } from "@/lib/prisma";

export default async function NoteDetailPage({ params }) {
  const noteId = params.id;
  const note = await getNote(noteId);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">Click a note on the left to view something! 🥺</span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
