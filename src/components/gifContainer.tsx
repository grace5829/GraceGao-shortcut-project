import { MyObject } from "@/types/common";
import React from "react";
import "./gifContainer.css";
import uuid from "react-uuid";

export default function GifContainer({
  results,
  selectedRating,
}: {
  results: MyObject[];
  selectedRating: string;
}) {
  const filteredResults = results.filter(
    (result) => result.rating === selectedRating
  );
  return (
    <div className="gifs-container">
      {filteredResults.map((result) => (
        <img
          key={uuid()}
          src={result.images.fixed_height.url}
          alt={result.title}
        />
      ))}
    </div>
  );
}
