import { signal } from "@preact-signals/safe-react";
import type { ReactNode } from "react";

const isOpen = signal(false);
const content = signal<ReactNode | null>(null);

const modalStore = {
  isOpen,
  content,
  open(node: ReactNode) {
    console.log("opening modal");

    content.value = node;
    isOpen.value = true;
  },
  close() {
    isOpen.value = false;
    content.value = null;
  },
  toggle(node?: ReactNode) {
    if (node !== undefined) {
      this.open(node);
      return;
    }
    isOpen.value = !isOpen.value;
  },
};

export default modalStore;
