/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import {
  BoldIcon,
  ItalicIcon,
  CodeIcon,
  HighlighterIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  TextQuoteIcon,
  ListIcon,
  ListOrderedIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  TableIcon,
  BetweenVerticalStartIcon,
  BetweenVerticalEndIcon,
  BetweenHorizonalEndIcon,
  BetweenHorizonalStartIcon,
  Grid2X2XIcon,
  ListXIcon,
  CopyXIcon,
  TableCellsMergeIcon,
  TableCellsSplitIcon,
  ListChecksIcon,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface TiptapToolbarProps {
  editor?: Editor | null;
}

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
  return (
    <div className="bg-card/40 border-border w-full items-center justify-between rounded-lg border p-1 md:flex">
      <div className="items-center space-x-1 md:flex md:gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              data-state={editor?.isActive("bold") ? "on" : "off"}
            >
              <BoldIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              data-state={editor?.isActive("italic") ? "on" : "off"}
            >
              <ItalicIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="underline"
              aria-label="Toggle underline"
              onClick={() =>
                editor?.chain().focus().toggleMark("underline").run()
              }
              data-state={editor?.isActive("underline") ? "on" : "off"}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Underline</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="strikethrough"
              aria-label="Toggle strikethrough"
              onClick={() => editor?.chain().focus().toggleMark("strike").run()}
              data-state={editor?.isActive("strike") ? "on" : "off"}
            >
              <StrikethroughIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Strikethrough</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="code"
              aria-label="Toggle code"
              onClick={() => editor?.chain().focus().toggleCode().run()}
              data-state={editor?.isActive("code") ? "on" : "off"}
            >
              <CodeIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Code</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="highlight"
              aria-label="Toggle highlight"
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              data-state={editor?.isActive("highlight") ? "on" : "off"}
            >
              <HighlighterIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Highlight</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="subscript"
              aria-label="Toggle subscript"
              onClick={() =>
                editor?.chain().focus().toggleMark("subscript").run()
              }
              data-state={editor?.isActive("subscript") ? "on" : "off"}
            >
              <SubscriptIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Subscript</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="superscript"
              aria-label="Toggle superscript"
              onClick={() =>
                editor?.chain().focus().toggleMark("superscript").run()
              }
              data-state={editor?.isActive("superscript") ? "on" : "off"}
            >
              <SuperscriptIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Superscript</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="left"
              aria-label="Left align"
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              data-state={
                editor?.isActive({ textAlign: "left" }) ? "on" : "off"
              }
            >
              <AlignLeftIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Left</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="center"
              aria-label="Center align"
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              data-state={
                editor?.isActive({ textAlign: "center" }) ? "on" : "off"
              }
            >
              <AlignCenterIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Center</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="right"
              aria-label="Right align"
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              data-state={
                editor?.isActive({ textAlign: "right" }) ? "on" : "off"
              }
            >
              <AlignRightIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="justify"
              aria-label="Justify align"
              onClick={() =>
                editor?.chain().focus().setTextAlign("justify").run()
              }
              data-state={
                editor?.isActive({ textAlign: "justify" }) ? "on" : "off"
              }
            >
              <AlignJustifyIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Justify</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="blockquote"
              aria-label="Toggle blockquote"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              data-state={editor?.isActive("blockquote") ? "on" : "off"}
            >
              <TextQuoteIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="bullet-list"
              aria-label="Toggle bullet list"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              data-state={editor?.isActive("bulletList") ? "on" : "off"}
            >
              <ListIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Bullet List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="ordered-list"
              aria-label="Toggle ordered list"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              data-state={editor?.isActive("orderedList") ? "on" : "off"}
            >
              <ListOrderedIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Ordered List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="task-list"
              aria-label="Toggle tasklist"
              onClick={() => editor?.chain().focus().toggleTaskList().run()}
              data-state={editor?.isActive("taskList") ? "on" : "off"}
            >
              <ListChecksIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Task List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="heading-1"
              aria-label="Toggle heading 1"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              data-state={
                editor?.isActive("heading", { level: 1 }) ? "on" : "off"
              }
            >
              <Heading1Icon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="heading-2"
              aria-label="Toggle heading 2"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              data-state={
                editor?.isActive("heading", { level: 2 }) ? "on" : "off"
              }
            >
              <Heading2Icon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="heading-3"
              aria-label="Toggle heading 3"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              data-state={
                editor?.isActive("heading", { level: 3 }) ? "on" : "off"
              }
            >
              <Heading3Icon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              value="heading-4"
              aria-label="Toggle heading 4"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 4 }).run()
              }
              data-state={
                editor?.isActive("heading", { level: 4 }) ? "on" : "off"
              }
            >
              <Heading4Icon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 4</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Insert table"
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Table</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Insert column before"
              onClick={() => editor?.chain().focus().addColumnBefore().run()}
            >
              <BetweenHorizonalStartIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Column Before</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Insert column after"
              onClick={() => editor?.chain().focus().addColumnAfter().run()}
            >
              <BetweenHorizonalEndIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Column After</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Delete column"
              onClick={() => editor?.chain().focus().deleteColumn().run()}
            >
              <Grid2X2XIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Column</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Insert row before"
              onClick={() => editor?.chain().focus().addRowBefore().run()}
            >
              <BetweenVerticalStartIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Row Before</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Insert row after"
              onClick={() => editor?.chain().focus().addRowAfter().run()}
            >
              <BetweenVerticalEndIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Row After</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Delete row"
              onClick={() => editor?.chain().focus().deleteRow().run()}
            >
              <ListXIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Row</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Delete table"
              onClick={() => editor?.chain().focus().deleteTable().run()}
            >
              <CopyXIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Table</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Merge cells"
              onClick={() => editor?.chain().focus().mergeCells().run()}
            >
              <TableCellsMergeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Merge Cells</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="split cells"
              onClick={() => editor?.chain().focus().splitCell().run()}
            >
              <TableCellsSplitIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Split Cells</TooltipContent>
        </Tooltip>
      </div>
      <div className="text-primary mr-4 flex items-center justify-center gap-1">
        <div className="text-xs">
          <span className="font-bold">
            {editor?.storage.characterCount.characters()}
          </span>{" "}
          characters
        </div>
        /
        <div className="text-xs">
          <span className="font-bold">
            {editor?.storage.characterCount.words()}
          </span>{" "}
          words
        </div>
      </div>
    </div>
  );
}
