"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENSION_MAP } from "@/constant";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue }) => {
      const type = renderValue() as string;
      const extension = type?.split("/")[1] || "file";
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension] || "#999"}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
    cell: ({ renderValue }) => (
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {renderValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue }) => (
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(renderValue() as string).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue }) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {prettyBytes(renderValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: "downloadURL",
    header: "Download",
    cell: ({ renderValue, row }) => {
      const url = renderValue() as string;
      const filename = row.original.filename;
      return (
        <a
          href={url}
          download={filename}
          className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-all"
        >
          Download
        </a>
      );
    },
  },
];
