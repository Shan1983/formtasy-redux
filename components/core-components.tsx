import {
  FilterIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
  AlertTriangleIcon,
  Loader2,
  MoreVerticalIcon,
  Trash2Icon,
  FilePlusCornerIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type CoreHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | {
      onNew: () => void;
      newButtonHref?: never;
    }
  | { newButtonHref: string; onNew?: never }
  | { newButtonHref?: never; onNew?: never }
);

export const CoreHeader = ({
  title,
  description,
  newButtonLabel,
  newButtonHref,
  onNew,
  disabled,
  isCreating,
}: CoreHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-2">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button disabled={disabled || isCreating} onClick={onNew} size="lg">
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

interface CoreSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CoreSearch = ({
  value,
  onChange,
  placeholder = "Search",
}: CoreSearchProps) => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <div className="relative w-full">
        <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="w-full bg-background shadow-none border-border pl-8"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <Button size="sm" variant={"outline"}>
        <FilterIcon className="size-4" />
      </Button>
      <Button size="sm" variant={"outline"}>
        <XIcon className="size-4" />
      </Button>
    </div>
  );
};

interface CorePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const CorePagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: CorePaginationProps) => {
  return (
    <div className="flex flex-col items-center justify-end w-full">
      <Separator className="w-full" />
      <div className="flex items-center justify-end w-full">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            disabled={page === 1 || disabled}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            variant={"outline"}
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={page === totalPages || totalPages === 0 || disabled}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            variant={"outline"}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

type CoreContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const CoreContainer = ({
  children,
  header,
  search,
  pagination,
}: CoreContainerProps) => {
  return (
    <div className="p-4 h-full w-full">
      <div className="mx-auto w-full flex flex-col gap-y-2 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          <Separator className="w-full" />
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
  buttonLabel?: string;
  heading?: string;
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2 className="size-6 animate-spin text-primary" />
      {!!message && (
        <p className="text-sm text-muted-foreground">
          {message || `Loading...`}
        </p>
      )}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && (
        <p className="text-sm text-muted-foreground">
          {message || `Loading...`}
        </p>
      )}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({
  message,
  onNew,
  buttonLabel,
  heading,
}: EmptyViewProps) => {
  return (
    <Empty className="border bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FilePlusCornerIcon className="size-8 text-muted-foreground" />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>{heading || "No items"}</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>{buttonLabel || "Add item"}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface CoreListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function CoreList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: CoreListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-1/2 py-10 h-full mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface CoreItemProps {
  href: string;
  title: string;
  subTitle?: React.ReactNode;
  actions?: React.ReactNode;
  image?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const CoreItem = ({
  href,
  title,
  subTitle,
  actions,
  image,
  onRemove,
  isRemoving,
  className,
}: CoreItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) {
      return;
    }

    if (onRemove) {
      await onRemove();
    }
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 shadow-none hover:shadow cursor-pointer rounded",
          isRemoving && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subTitle && (
                <CardDescription className="text-xs">
                  {subTitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex gap-x-4 items-center">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant={"ghost"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemove}>
                      <Trash2Icon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
