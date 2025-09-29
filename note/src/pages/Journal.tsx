import { useEffect, useState, type JSX } from "react";
import api from "../ts/api";
import Note from "../Components/note";

interface NoteData {
    content: string;
    id: string;
    title: string;
    isPublic: string;
}

function Journal(): JSX.Element {
    const [noteList, setNoteList] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [noteShow, setnoteShow] = useState(false);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/Notes/private-notes");
            console.log("API response:", response.data);
            const notesData = response.data || [];
            setNoteList(notesData);
            setError(null);
        } catch (err) {
            console.log("Something went wrong fetching notes:", err);
            setError("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteAction = () => {
        fetchNotes();
        setnoteShow(false);
    };

    return (
        <>
            <button onClick={() => setnoteShow(!noteShow)}>Add note</button>
            {noteShow && (
                <Note
                    initial={JSON.stringify([
                        {
                            type: "paragraph",
                            children: [
                                { text: "Start writing your note here..." },
                            ],
                        },
                    ])}
                    id=""
                    isPublic="false"
                    onAction={handleNoteAction}
                />
            )}
            <h2>Private notes:</h2>
            {loading && <p>Loading notes...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!loading && !error && noteList.length === 0 && (
                <p>No private notes available.</p>
            )}
            {!loading &&
                !error &&
                noteList.map((note: NoteData) => (
                    <div
                        key={note.id}
                        style={{
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                    >
                        <h3>Note: {note.title}</h3>
                        <Note
                            initial={note.content}
                            id={note.id}
                            isPublic="false"
                            onAction={handleNoteAction}
                        />
                    </div>
                ))}
        </>
    );
}

export default Journal;
