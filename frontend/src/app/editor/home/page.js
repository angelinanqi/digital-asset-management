"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import AssetCard from "@/components/AssetCard.jsx";

export default function EditorHome() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // redirect to login page if no token
      router.push("/login");
    }
  }, [router]);

  // optional: don't render the page until the token check is done
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (!accessToken) return null; // prevents flashing content

  return (
    <EditorLayout>
      <h1>
        <b>Digital Assets</b>
      </h1>
      <br />

      {/* Display asset in card format */}
      <AssetCard />
    </EditorLayout>
  );
}
  