import type {
    CustomElement,
    CustomElementType,
    CustomElementWithAlign,
    CustomKey,
} from "custom-types";
import { Editor } from "slate";
import { Transforms, Element as SlateElement } from "slate";

const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;

export type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
type ListType = (typeof LIST_TYPES)[number];
export type CustomElementFormat = CustomElementType | AlignType | ListType;

export const isAlignType = (
    format: CustomElementFormat
): format is AlignType => {
    return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isListType = (format: CustomElementFormat): format is ListType => {
    return LIST_TYPES.includes(format as ListType);
};

export const isAlignElement = (
    element: CustomElement
): element is CustomElementWithAlign => {
    return "align" in element;
};

//here you can define how do you want the editor to behave, add custom functions, like toggleMark
export const CustomEditor = {
    //gives back if the mark is on the text or not (so is it bold? yes or no)
    isMarkActive(editor: Editor, format: CustomKey): boolean {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },

    //toggles the marks
    toggleMark(editor: Editor, format: CustomKey): void {
        const isActive = CustomEditor.isMarkActive(editor, format);
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },

    isBlockActive(
        editor: Editor,
        format: CustomElementFormat,
        blockType: "type" | "align" = "type"
    ): boolean {
        const { selection } = editor;
        if (!selection) return false;

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: (n) => {
                    if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
                        const el = n as SlateElement & {
                            align?: string;
                            type?: string;
                        };
                        if (blockType === "align" && isAlignElement(n)) {
                            return el.align === format;
                        }
                        return el.type === format;
                    }
                    return false;
                },
            })
        );

        return !!match;
    },

    toggleBlock(editor: Editor, format: CustomElementFormat): void {
        const isActive = CustomEditor.isBlockActive(
            editor,
            format,
            isAlignType(format) ? "align" : "type"
        );

        const isList = isListType(format);

        Transforms.unwrapNodes(editor, {
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                isListType((n as TypedElement).type) &&
                !isAlignType(format),
            split: true,
        });
        let newProperties: Partial<SlateElement>;
        if (isAlignType(format)) {
            newProperties = {
                align: isActive ? undefined : format,
            };
        } else {
            newProperties = {
                type: isActive ? "paragraph" : isList ? "list-item" : format,
            };
        }
        Transforms.setNodes<SlateElement>(editor, newProperties);

        if (!isActive && isList) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },
};

type TypedElement = SlateElement & {
    type?: string;
    align?: string;
};
