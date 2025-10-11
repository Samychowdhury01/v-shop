"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AgeVerificationDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = getCookie("age_verified");

    if (ageVerified === "false" && pathname !== "/age-restricted") {
      router.push("/age-restricted");
      return;
    }

    if (!ageVerified) {
      // Show dialog if not verified
      setOpen(true);
    }
  }, [pathname, router]);

  const handleYes = () => {
    // Set cookie for 1 year
    setCookie("age_verified", "true", 1);
    setOpen(false);
  };

  const handleNo = () => {
    // Set cookie to remember they said no
    setCookie("age_verified", "false", 1);
    setOpen(false);
    // Redirect to age restriction page
    router.push("/age-restricted");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md border-zinc-200 bg-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Vape Dubai Hub"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-black">
            Age Verification
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-700 pt-2">
            You must be 18 years or older to access this website.
            <br />
            Are you 18 years of age or older?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 pt-2">
          <Button
            onClick={handleNo}
            variant="outline"
            className="flex-1 bg-white border-zinc-300 text-black hover:bg-zinc-100 hover:text-black"
          >
            No
          </Button>
          <Button
            onClick={handleYes}
            className="flex-1 bg-black text-white hover:bg-zinc-800"
          >
            Yes, I am 18+
          </Button>
        </div>
        {/* disclaimer  content*/}
        <p className="text-xs text-zinc-500 text-center mt-4 font-thin ">
          WARNING: This product can expose you to chemicals including nicotine,
          which is known to cause birth defects or other reproductive harm.
          Products sold on this site is intended for adult smokers.
        </p>
      </DialogContent>
    </Dialog>
  );
}

// Cookie helper functions
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
