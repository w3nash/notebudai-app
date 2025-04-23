import { Tiptap } from "@/components/tiptap-editor";

export async function generateMetadata() {
  return {
    title: `New Note`,
  };
}

export default async function NewNotePage() {
  return <Tiptap />;
}
