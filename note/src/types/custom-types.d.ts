import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { BaseEditor, BaseRange, Element } from "slate";

export type Descendant = CustomText | CustomElement;
//different types of elements (paragraph, heading etc.)
export type BlockQuoteElement = {
    type: "block-quote";
    align?: string;
    children: Descendant[];
};

export type BulletedListElement = {
    type: "bulleted-list";
    align?: string;
    children: Descendant[];
};

export type CheckListItemElement = {
    type: "check-list-item";
    checked: boolean;
    children: Descendant[];
};

export type EditableVoidElement = {
    type: "editable-void";
    children: EmptyText[];
};

export type HeadingElement = {
    type: "heading-one";
    align?: string;
    children: Descendant[];
};

export type HeadingTwoElement = {
    type: "heading-two";
    align?: string;
    children: Descendant[];
};

export type ImageElement = {
    type: "image";
    url: string;
    children: EmptyText[];
};

export type LinkElement = { type: "link"; url: string; children: Descendant[] };

export type ButtonElement = { type: "button"; children: Descendant[] };

export type BadgeElement = { type: "badge"; children: Descendant[] };

export type ListItemElement = { type: "list-item"; children: Descendant[] };

export type NumberedListItemElement = {
    type: "numbered-list";
    children: Descendant[];
};

export type MentionElement = {
    type: "mention";
    character: string;
    children: CustomText[];
};

export type ParagraphElement = {
    type: "paragraph";
    align?: string;
    children: Descendant[];
};

export type TitleElement = { type: "title"; children: Descendant[] };

export type CodeBlockElement = {
    type: "code-block";
    language: string;
    children: Descendant[];
};

export type CodeLineElement = {
    type: "code-line";
    children: Descendant[];
};

//CustomElement with and without align property
export type CustomElementWithAlign =
    | ParagraphElement
    | HeadingElement
    | HeadingTwoElement
    | HeadingThreeElement
    | BlockQuoteElement
    | BulletedListElement;

type CustomElement =
    | BlockQuoteElement
    | BulletedListElement
    | CheckListItemElement
    | EditableVoidElement
    | HeadingElement
    | HeadingTwoElement
    | ImageElement
    | LinkElement
    | ButtonElement
    | BadgeElement
    | ListItemElement
    | NumberedListItemElement
    | MentionElement
    | ParagraphElement
    | TitleElement
    | CodeBlockElement
    | CodeLineElement;

export type CustomElementType = CustomElement["type"];

export type RenderElementPropsFor<T> = RenderElementProps & {
    element: T;
};

//Editortype - historyeditor -> helps in undo/redo
export type EditorType = BaseEditor &
    ReactEditor &
    HistoryEditor & {
        nodeToDecorations?: Map<Element, Range[]>;
    };

//Text type - it defines the text what properties the text could have
export type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    underlined?: boolean;
    title?: boolean;
    list?: boolean;
    hr?: boolean;
    blockquote?: boolean;
};

//customkey gives back the customtext properties without the text field (so the bold, italic...)
export type CustomKey = keyof Omit<CustomText, "text">;

//types declaration so you can use slate with ts, altough it's a js library
declare module "slate" {
    interface CustomTypes {
        Editor: EditorType;
        Element: CustomElement;
        Text: CustomText;
        Range: BaseRange & {
            [key: string]: unknown;
        };
    }
}
