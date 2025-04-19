import { QueryClient, isServer } from "@tanstack/react-query";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (isServer) {
    return createQueryClient();
  } else {
    browserQueryClient ??= createQueryClient();
    return browserQueryClient;
  }
}