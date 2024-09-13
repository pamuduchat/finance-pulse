"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useEffect, useState } from "react";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    console.log("SheetProvider is not mounted");
    return null;
  }
  return (
    <>
      <NewAccountSheet />
    </>
  );
};
