"use client";
import GifContainer from "@/components/gifContainer";
import SearchButton from "@/components/searchArea";
import React, { useState } from "react";
import { MyObject } from "@/types/common";
import logo from "./GIPHY-Logo.gif"
import "./page.css";

export default function Home() {
  const [results, setResults] = useState<MyObject[]>([]);
  const [selectedRating, setSelectedRating] = useState("g");
  return (
    <div className="container">
      <SearchButton
        setResults={setResults}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <GifContainer results={results} selectedRating={selectedRating} />
      <img src={logo.src} alt='Giphy-logo' className="giphy-logo"/>
    </div>
  );
}
