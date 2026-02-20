"use client";
import { Button } from "@/components/ui/Button";

export function PdfButton() {
  return (
    <Button
      onClick={() => {
        window.print();
      }}
    >
      Yazdır / PDF
    </Button>
  );
}
