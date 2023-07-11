# NOTES APP

## REQUIREMENTS

- NODE VERSION 18.15.0

## INSTALLATION

`npm run dev`

```bash
> git clone https://github.com/d-acetun/notes-app.git
> cd notes-app
> npm install
> npm run dev
```

## DEPLOY

```bash
> npm run build
```

---

## VERCEL DEPLOY

```bash
> git push origin main
```

## SETTINGS

node_modules/@dnd-kit/sortable/dist/components/SortableContext.d.ts

Modify props interface, in items add another property besides the id.

**_Example_**

```ts
import React from "react";
import { ClientRect, UniqueIdentifier } from "@dnd-kit/core";
import type { Disabled, SortingStrategy } from "../types";
export interface Props {
  children: React.ReactNode;
  items: (
    | UniqueIdentifier
    | {
        id: UniqueIdentifier;
        [key: string]: any; // this change
      }
  )[];
  strategy?: SortingStrategy;
  id?: string;
  disabled?: boolean | Disabled;
}
interface ContextDescriptor {
  activeIndex: number;
  containerId: string;
  disabled: Disabled;
  disableTransforms: boolean;
  items: UniqueIdentifier[];
  overIndex: number;
  useDragOverlay: boolean;
  sortedRects: ClientRect[];
  strategy: SortingStrategy;
}
export declare const Context: React.Context<ContextDescriptor>;
export declare function SortableContext({
  children,
  id,
  items: userDefinedItems,
  strategy,
  disabled: disabledProp,
}: Props): JSX.Element;
export {};
```
