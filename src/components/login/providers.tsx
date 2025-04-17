"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

interface Provider {
  id: string;
  name: string;
}

export function LogInProviders({ providers }: { providers: Provider[] }) {
  return (
    <div className="flex flex-col gap-4">
      {providers.map((provider) => (
        <Button key={provider.id} onClick={() => signIn(provider.id)}>
          <span className="rounded-full bg-white p-1">
            <Image
              src={`assets/providers/${provider.id}.svg`}
              alt={provider.name}
              width={14}
              height={14}
            />
          </span>
          Continue with {provider.name}
        </Button>
      ))}
    </div>
  );
}
