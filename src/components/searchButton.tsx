"use client";
import { MyObject } from "@/types/common";
import React, { useState } from "react";

const apikey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function SearchButton({
  setResults,
  selectedRating,
  setSeletedRating,
}: {
  setResults: React.Dispatch<React.SetStateAction<MyObject[]>>;
  selectedRating: string;
  setSeletedRating: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchInput, setSearchInput] = useState("");
  const GifRatings = ["g", "y", "pg", "pg-13", "r"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (search: string) => {
    fetchData(search, selectedRating);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeletedRating(e.target.value);
    fetchData(searchInput, e.target.value);
  };
  const fetchData = async (search: string, newRating: string) => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${search}&limit=25&offset=0&rating=${newRating}&lang=en&bundle=messaging_non_clips`
      );

      const result = await res.json();
      setResults(result.data);
    } catch (error: any) {
      console.log("Error fetching Giphy results", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <button
        id="search-button"
        onClick={() => {
          handleSubmit(searchInput);
        }}
      >
        Enter
      </button>
      <div>
        GIF rating:
        <select onChange={(e) => handleRatingChange(e)} value={selectedRating}>
          {GifRatings.map((rating) => (
            <option value={rating} key={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
