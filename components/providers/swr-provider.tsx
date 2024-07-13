"use client";
import { testBaseUrl } from "@/lib/global";
import { logger } from "@/lib/swr-logger";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import { useToast } from "../ui/use-toast";
import { MyError } from "@/lib/handle-response";
import { useRouter } from "next/navigation";
import { ClearUserInfo } from "@/lib/clear-user-info";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(testBaseUrl + url).then(res => res.json()),
        errorRetryCount: 3,
        suspense: true,
        use: [logger],
        onError: error => {
          if (error.status === 400) {
            toast({
              title: "用户校验错误",
              description: "您可能未登录",
              duration: 2000,
            });
            router.replace("/");
            ClearUserInfo();
          } else if (error.status === 500) {
            toast({
              title: "服务器错误",
              description: "远端服务器发生未知错误, 请等待恢复",
              duration: 2000,
            });
          } else {
            if (error.when) {
              toast({
                title: `${error.when}时发生错误`,
                description: error.info,
              });
            }
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
