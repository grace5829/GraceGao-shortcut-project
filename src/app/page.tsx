"use client";
import GifContainer from "@/components/gifContainer";
import SearchButton from "@/components/searchButton";
import React, { useEffect, useState } from "react";
import { MyObject } from "@/types/common";
const apikey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function Home() {
  const [results, setResults] = useState<MyObject[]>([]);
  const [selectedRating, setSelectedRating] = useState('g');
console.log(results)
  return (
    <div>
 <SearchButton setResults={setResults} selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
 <GifContainer results={results}  selectedRating={selectedRating}/>

    </div>
  );
}
