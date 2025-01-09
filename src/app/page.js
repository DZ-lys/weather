"use client";
import Left from "@/components/Left";
import Right from "@/components/Right";
import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="flex">
      <Left />
      <Right />
    </div>
  );
}
