"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import { Button } from "@/components/ui/button";
import LightDarkToggle from "@/components/ui/light-dark-toggle";
import Link from "next/link";
import ProjectsSelect from "../projects/components/projects-select";
import ProjectMenu from "../projects/components/project-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MainMenu() {
  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col">
      <header className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 flex flex-col gap-1 grow">
        <Tabs defaultValue="person">
          <TabsList className="">
            <TabsTrigger value="person">个人空间</TabsTrigger>
            <TabsTrigger value="project">项目空间</TabsTrigger>
          </TabsList>
          <TabsContent value="person">
            <MenuItem href="/projects">项目列表</MenuItem>
            <MenuItem href="/agenda">日程</MenuItem>
            <MenuItem href="/tasks">任务</MenuItem>
            <MenuItem href="/draft">草稿</MenuItem>
            <MenuItem href="/profile">个人资料</MenuItem>
            <MenuItem href="/dashboard">仪表盘</MenuItem>
            <MenuItem href="/inbox">收件箱</MenuItem>
          </TabsContent>
          <TabsContent value="project">
            <ProjectMenu />
          </TabsContent>
        </Tabs>
      </ul>
      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800 select-none">
            DC
          </AvatarFallback>
        </Avatar>
        <Button variant={"outline"} asChild>
          <Link href="/">登出</Link>
        </Button>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}