import { MyObject } from "@/types/common";
import React, { useState } from "react";
import "./gifContainer.css";

export default function GifContainer({
  results,
  selectedRating,
}: {
  results: MyObject[];
  selectedRating: string;
}) {
  const filteredResults=results.filter(result=> result.rating===selectedRating)
  return (
    <div className="gifs-container">
        {filteredResults.map((result) => (
          <img key={result.id} src={result.images.fixed_height.url} alt={result.title}/>
        ))}
      </div>
  );
}
