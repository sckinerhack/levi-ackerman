'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { Genres } from "@/typings";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';

const ClientDropdown = ({ data } : { data : Genres }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} >
    <DropdownMenuTrigger className="text-white flex justify-center items-center">
      Genre <ChevronDown className="ml-1" />
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {data.genres.map((genre) => (
        <DropdownMenuItem
          className="cursor-pointer"
          key={genre.id}
          onClick={handleLinkClick}
        >
          <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
            {genre.name}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
export default ClientDropdown;