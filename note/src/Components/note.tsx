import type { JSX } from "react";
import { useCallback, useMemo, useState } from "react";
import {
    Slate,
    Editable,
    withReact,
    type RenderElementProps,
    type RenderLeafProps,
    useSlate,
} from "slate-react";
import { createEditor } from "slate";
import {
    CustomEditor,
    isAlignElement,
    isAlignType,
    type AlignType,
    type CustomElementFormat,
} from "../types/Work.ts";
import { withHistory } from "slate-history";
import type { CustomKey } from "custom-types.js";
import api from "../ts/api.ts";

interface BlockButtonProps {
    format: CustomElementFormat;
    icon: string;
}

const BlockButton = ({ format, icon }: BlockButtonProps) => {
    const editor = useSlate();
    return (
        <button
            className={
                CustomEditor.isBlockActive(
                    editor,
                    format,
                    isAlignType(format) ? "align" : "type"
                )
                    ? "active"
                    : ""
            }
            onPointerDown={(event: React.PointerEvent<HTMLButtonElement>) =>
                event.preventDefault()
            }
            onClick={() => CustomEditor.toggleBlock(editor, format)}
            data-test-id={`block-button-${format}`}
        >
            <p>{icon}</p>
        </button>
    );
};

interface MarkButtonProps {
    format: CustomKey;
    icon: string;
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
    const editor = useSlate();
    return (
        <button
            className={
                CustomEditor.isMarkActive(editor, format) ? "active" : ""
            }
            onPointerDown={(event: React.PointerEvent<HTMLButtonElement>) =>
                event.preventDefault()
            }
            onClick={() => CustomEditor.toggleMark(editor, format)}
        >
            <p>{icon}</p>
        </button>
    );
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
    const style: React.CSSProperties = {};
    if (isAlignElement(element) && "align" in element) {
        style.textAlign = (element as { align: string }).align as AlignType;
    }

    switch (element.type) {
        case "block-quote":
            return (
                <blockquote {...attributes} style={style}>
                    {children}
                </blockquote>
            );
        case "bulleted-list":
            return (
                <ul {...attributes} style={style}>
                    {children}
                </ul>
            );
        case "heading-one":
            return (
                <h1 {...attributes} style={style}>
                    {children}
                </h1>
            );
        case "heading-two":
            return (
                <h2 {...attributes} style={style}>
                    {children}
                </h2>
            );
        case "list-item":
            return (
                <li {...attributes} style={style}>
                    {children}
                </li>
            );
        case "numbered-list":
            return (
                <ol {...attributes} style={style}>
                    {children}
                </ol>
            );
        case "paragraph":
            return (
                <p {...attributes} style={style}>
                    {children}
                </p>
            );
        default:
            console.log(`Unhandled element type: ${element.type}`);
            return <p {...attributes}>{children || null}</p>;
    }
};

const LeafElement = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
};

interface NoteProps {
    initial?: string;
}

function Note({ initial }: NoteProps): JSX.Element {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const initialValue = useMemo(
        () =>
            JSON.parse(
                initial ??
                    localStorage.getItem("content") ??
                    JSON.stringify([
                        {
                            type: "paragraph",
                            children: [
                                { text: "A line of text in a paragraph." },
                            ],
                        },
                    ])
            ),
        [initial]
    );

    const renderElement = useCallback((props: RenderElementProps) => {
        return <Element {...props} />;
    }, []);

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <LeafElement {...props} />;
    }, []);

    const [content, SetContent] = useState("");

    const handleSave = async () => {
        try {
            const res = api.post("api/Auth/notes/", {
                title: new Date().toISOString(),
                content: content,
            });
            console.log(res);
        } catch {
            console.log("Something went wrong");
        }
    };

    return (
        <>
            <Slate
                editor={editor}
                initialValue={initialValue}
                onChange={(value) => {
                    const isAstChange = editor.operations.some(
                        (op: { type: string }) => "set_selection" !== op.type
                    );
                    if (isAstChange) {
                        const contenttext = JSON.stringify(value);
                        SetContent(contenttext);
                        localStorage.setItem("content", content);
                    }
                }}
            >
                <div>
                    <MarkButton format="bold" icon="B" />
                    <MarkButton format="italic" icon="I" />
                    <MarkButton format="underline" icon="U" />
                    <MarkButton format="code" icon="code" />
                    <BlockButton format="heading-one" icon="H1" />
                    <BlockButton format="heading-two" icon="H2" />
                    <BlockButton format="block-quote" icon="quote" />
                    <BlockButton format="numbered-list" icon="o. list" />
                    <BlockButton format="bulleted-list" icon="u. list" />
                    <BlockButton format="left" icon="a. left" />
                    <BlockButton format="center" icon="a. center" />
                    <BlockButton format="right" icon="a. right" />
                    <BlockButton format="justify" icon="a. justify" />
                </div>
                <Editable
                    style={{ padding: 10 }}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }

                        switch (event.key) {
                            case "b": {
                                event.preventDefault();
                                CustomEditor.toggleMark(editor, "bold");
                                break;
                            }
                        }
                    }}
                />
            </Slate>
            <button onClick={handleSave}>Save</button>
        </>
    );
}

export default Note;
