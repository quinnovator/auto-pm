import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import Link from "next/link";

interface SidebarIconProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarIcon({ href, icon, label }: SidebarIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {href ? (
            <Link href={href}>
              <button className="p-2 rounded-md hover:bg-accent mx-2">
                {icon}
              </button>
            </Link>
          ) : (
            <button className="p-2 rounded-md hover:bg-accent mx-2">
              {icon}
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent side="right" align="center" sideOffset={16}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface SidebarProps {
  icons: SidebarIconProps[];
  leadingIcon?: React.ReactNode;
}

export function Sidebar({ icons, leadingIcon }: SidebarProps) {
  return (
    <div className="h-screen w-20 bg-background border-r flex flex-col items-center py-4 space-y-4">
      {leadingIcon && (
        <div className="mb-4">
          {leadingIcon}
        </div>
      )}
      {icons.map((icon, index) => (
        <SidebarIcon key={index} {...icon} />
      ))}
    </div>
  );
}