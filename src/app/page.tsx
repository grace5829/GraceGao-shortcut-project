"use client";
import GifContainer from "@/components/gifContainer";
import SearchButton from "@/components/searchArea";
import React, { useState } from "react";
import { MyObject } from "@/types/common";

export default function Home() {
  const [results, setResults] = useState<MyObject[]>([]);
  const [selectedRating, setSelectedRating] = useState("g");
  return (
    <div>
      <SearchButton
        setResults={setResults}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <GifContainer results={results} selectedRating={selectedRating} />
    </div>
  );
}
