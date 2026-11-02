"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useLockBody } from "@/lib/hooks";
import Icon from "./Icon";

/** Visor a pantalla completa. Sólo existe en el DOM mientras está abierto. */
export default function Modal({
  open,
  onClose,
  onPrev,
  onNext,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  label: string;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      last?.focus();
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="modal-in fixed inset-0 z-[60] grid place-items-center bg-black/95 p-5 py-20"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 grid size-12 place-items-center border border-white/25 text-white transition-transform duration-500 hover:rotate-90">
        <Icon name="close" />
      </button>
      {onPrev && (
        <button type="button" onClick={onPrev} aria-label="Anterior" className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 text-white hover:bg-white/10 max-sm:bottom-5 max-sm:top-auto max-sm:translate-y-0">
          <Icon name="arrow" className="size-5 rotate-180" />
        </button>
      )}
      {onNext && (
        <button type="button" onClick={onNext} aria-label="Siguiente" className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 text-white hover:bg-white/10 max-sm:bottom-5 max-sm:top-auto max-sm:translate-y-0">
          <Icon name="arrow" className="size-5" />
        </button>
      )}
      {children}
    </div>
  );
}
