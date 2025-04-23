"use client";

import { getFavoriteNotes } from "@/server/notes";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { FileText, Badge, Tag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export function FavoriteNotesContent() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoriteNotes,
  });

  if (isLoading) {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Card key={index} className="flex h-48 flex-col">
          <CardHeader>
            <div className="bg-muted h-6 w-3/4 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded-md"></div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted h-16 animate-pulse rounded-md"></div>
          </CardContent>
        </Card>
      ));
  }

  if (isError) {
    return (
      <Card className="col-span-full p-6">
        <CardTitle className="mb-2">Error Loading Notes</CardTitle>
        <CardDescription>
          There was a problem loading your favorites notes. Please try again
          later.
        </CardDescription>
      </Card>
    );
  }

  if (!notes?.length) {
    return (
      <Card className="col-span-full border-dashed p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <FileText className="text-muted-foreground h-8 w-8" />
          <CardTitle>No Favorite Notes Yet</CardTitle>
          <CardDescription>Create your first favorite note!</CardDescription>
          <Link href="/note/new" className="mt-2">
            <Button>Create Your First Favorite Note</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <>
      {notes?.map((note) => (
        <Link
          href={`/note/${note.id}`}
          key={note.id}
          className="transition-all hover:scale-[1.02]"
        >
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{note.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>In {note.folder.name}</span>
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter className="flex justify-between pt-4">
              <div className="flex gap-1">
                {note.tags
                  .map((tag) => (
                    <Badge key={tag.id} className="max-w-40 truncate">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag.name}
                    </Badge>
                  ))
                  .slice(0, 2)}
                {note.tags.length > 2 && <Badge>+{note.tags.length - 2}</Badge>}
              </div>
              <span className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(note.updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}
