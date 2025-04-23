"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { SaveIcon, StarIcon, TrashIcon } from "lucide-react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { TiptapToolbar } from "./tiptap-toolbar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Folder, Note } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFolders } from "@/server/folders";
import { toast } from "sonner";
import clsx from "clsx";
import { createNote, updateNote, deleteNote } from "@/server/notes";
import { useRouter } from "next/navigation";

export function Tiptap({
  note,
  isEditMode,
}: {
  note?: Note;
  isEditMode?: boolean;
}) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [folder, setFolder] = useState(note?.folderId ?? "");
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite ?? false);
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure(),
      Subscript,
      Superscript,
      Typography,
      TextAlign.configure({
        defaultAlignment: "left",
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write something about your note …",
      }),
      CharacterCount,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    autofocus: true,
    immediatelyRender: false,
    content: note?.content ?? "",
  });

  const { data: folders } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (note) => {
      toast.success("Note created successfully!");
      router.push(`/note/${note.id}`);
    },
    onError: (error) => {
      toast.error(`Error creating note: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateNote>[1];
    }) => updateNote(id, data),
    onSuccess: () => {
      toast.success("Note updated successfully!");
      // Optionally, redirect or update the UI
    },
    onError: (error) => {
      toast.error(`Error updating note: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Note deleted successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(`Error deleting note: ${error.message}`);
    },
  });

  const handleSaveNote = () => {
    if (isEditMode) {
      // Update note logic
      if (note) {
        updateMutation.mutate({
          id: note.id,
          data: {
            title,
            content: editor?.getHTML() ?? "",
            folderId: folder,
            isFavorite,
          },
        });
      }
    } else {
      createMutation.mutate({
        title,
        content: editor?.getHTML() ?? "",
        folderId: folder,
        isFavorite,
      });
    }
  };

  const handleDeleteNote = () => {
    if (note) {
      deleteMutation.mutate({ id: note.id });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <Card className="bg-card/40 shadow-none backdrop-blur-lg">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Bud Editor</CardTitle>
            <CardDescription>
              A rich-text editor for your notes.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsFavorite(!isFavorite)}
              className={clsx(
                "group text-sm hover:bg-yellow-500",
                isFavorite ? "bg-yellow-400" : "",
              )}
              size="icon"
            >
              <StarIcon
                className={clsx(
                  "group-hover:fill-card",
                  isFavorite ? "fill-card" : "",
                )}
              />
            </Button>
            <Button onClick={handleSaveNote} size="icon">
              <SaveIcon />
            </Button>
            {isEditMode && (
              <Button
                variant="destructive"
                onClick={handleDeleteNote}
                size="icon"
              >
                <TrashIcon />
              </Button>
            )}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="title" className="w-12">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Label htmlFor="folder" className="w-12">
              Folder
            </Label>
            <Select value={folder} onValueChange={setFolder}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Folder</SelectLabel>
                  {folders?.map((folder: Folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <TiptapToolbar editor={editor} />
      <ScrollArea className="bg-card/40 border-border h-dvh rounded-lg border backdrop-blur-lg">
        <EditorContent
          editor={editor}
          className="container w-full flex-1 p-4 md:py-22 md:pl-22"
        />
      </ScrollArea>
    </div>
  );
}
