"use client";
import { MyObject } from "@/types/common";
import React, { useEffect, useState } from "react";

const apikey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function SearchButton({
  setResults,
  selectedRating,
  setSelectedRating,

}: {
  setResults: React.Dispatch<React.SetStateAction<MyObject[]>>;
  selectedRating: string;
  setSelectedRating: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [offset, setOffset] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const GifRatings = ["g", "y", "pg", "pg-13", "r"];
  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };
    const debouncedScroll = debounce(handleScroll, 200); 
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [offset, searchInput, selectedRating]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = () => {
    setOffset(0);
    setResults([]);
    fetchData(searchInput, selectedRating, 0);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(e.target.value);
    setOffset(0);
    setResults([]);
    fetchData(searchInput, e.target.value, 0);
  };


  
const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    await fetchData(searchInput, selectedRating, offset);
    setLoading(false);
  };

  const fetchData = async (search: string, rating: string, offset: number) => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${search}&limit=25&offset=${offset}&rating=${rating}&lang=en&bundle=messaging_non_clips`
      );
      const result = await res.json();
      console.log(offset)
      console.log(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${search}&limit=25&offset=${offset}&rating=${rating}&lang=en&bundle=messaging_non_clips`
      )
      console.log(result)
      setResults((prevResults) => [...prevResults, ...result.data]);
      setOffset(offset + 25);
    } catch (error: any) {
      console.error("Error fetching Giphy results:", error);
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
          handleSubmit();
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
