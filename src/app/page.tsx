"use client";
import GifContainer from "@/components/gifContainer";
import SearchButton from "@/components/searchButton";
import React, { useState } from "react";
import { MyObject } from "@/types/common";

export default function Home() {
  const [results, setResults] = useState<MyObject[]>([]);
  const [selectedRating, setSeletedRating] = useState('g');

 

  return (
    <div>
 <SearchButton setResults={setResults} selectedRating={selectedRating} setSeletedRating={setSeletedRating}/>
 <GifContainer results={results}  selectedRating={selectedRating}/>
    </div>
  );
}
