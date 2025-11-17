"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actionLabel,
  onAction,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <h2 className="text-xl font-heading font-semibold mb-4">
                {title}
              </h2>
              <div className="mb-6">{children}</div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onClose}>
                  Tutup
                </Button>
                {actionLabel && onAction && (
                  <Button onClick={onAction}>{actionLabel}</Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

