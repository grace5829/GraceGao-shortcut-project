"use client";
import { MyObject } from "@/types/common";
import React, { useEffect, useState } from "react";
import "./searchArea.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setOffset(0);
      setResults([]);
      fetchData(searchInput, selectedRating, 0);
    }
  };

  const handleRatingChange = (e: SelectChangeEvent<string>) => {
    if (e && "target" in e) {
      setSelectedRating(e.target.value as string);
      setOffset(0);
      setResults([]);
      fetchData(searchInput, e.target.value, 0);
    }
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
      console.log(offset);
      console.log(
        `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${search}&limit=25&offset=${offset}&rating=${rating}&lang=en&bundle=messaging_non_clips`
      );
      console.log(result);
      setResults((prevResults) => [...prevResults, ...result.data]);
      setOffset(offset + 25);
    } catch (error: any) {
      console.error("Error fetching Giphy results:", error);
    }
  };

  return (
    <div className="search-container">
      <span className="left-search-container">
        <input
          type="text"
          placeholder="Search GIFs here"
          onChange={handleChange}
          value={searchInput}
          onKeyDown={(e) => handleKeyDown(e)}
          id="giphy-search-bar"
        />
        <span
          onClick={handleSubmit}
          className="button button-outlined"
          data-button-svg
        >
          <span className="button-inner">
            <span className="button-inner-static">Enter</span>
            <span className="button-inner-hover">Enter</span>
          </span>
          <span>
            <svg
              className="button-outlined-bg"
              enableBackground="new 0 0 154 56"
              viewBox="0 0 154 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="buttonSvg_EJ7JVR0MF">
                <path
                  className="button-stroke"
                  d="m126 1c14.9 0 27 12.1 27 27s-12.1 27-27 27h-98c-14.9 0-27-12.1-27-27s12.1-27 27-27zm0-1h-98c-15.5 0-28 12.5-28 28 0 15.5 12.5 28 28 28h98c15.5 0 28-12.5 28-28 0-15.5-12.5-28-28-28z"
                ></path>
              </clipPath>
              <g clipPath="url(#buttonSvg_EJ7JVR0MF)">
                <g className="button-circles">
                  <g className="button-circles-o">
                    <circle
                      pathLength="1"
                      className="button-circle -layer-1"
                      strokeWidth="154"
                      cx="77"
                      cy="28"
                      r="77"
                    ></circle>
                    <circle
                      pathLength="1"
                      className="button-circle -layer-2"
                      strokeWidth="154"
                      cx="77"
                      cy="28"
                      r="77"
                    ></circle>
                    <circle
                      pathLength="1"
                      className="button-circle -layer-3"
                      strokeWidth="154"
                      cx="77"
                      cy="28"
                      r="77"
                    ></circle>
                    <circle
                      pathLength="1"
                      className="button-circle -layer-4"
                      strokeWidth="154"
                      cx="77"
                      cy="28"
                      r="77"
                    ></circle>
                  </g>
                  <circle
                    pathLength="1"
                    className="button-circle -hover"
                    strokeWidth="154"
                    cx="77"
                    cy="28"
                    r="77"
                  ></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>
      </span>
      <div className="right-search-container">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>GIF Rating</InputLabel>
            <Select
              value={selectedRating}
              label="rating"
              onChange={handleRatingChange}
            >
              {GifRatings.map((rating) => (
                <MenuItem value={rating} key={rating}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
