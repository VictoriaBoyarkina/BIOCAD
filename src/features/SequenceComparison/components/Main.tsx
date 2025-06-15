import React, { useState } from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

import { Form } from "./Form";
import { Result } from "./Result";
import { AminoAcids } from "../types";

export const Main: React.FC = () => {
  const [result, setResult] = useState<{
    input1: AminoAcids;
    input2: AminoAcids;
  }>({
    input1: "" as AminoAcids,
    input2: "" as AminoAcids,
  });

  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "70%",
        },
        maxWidth: 700,
        margin: "auto",
        mt: 16,
        boxShadow: 3,
      }}
    >
      <CardHeader
        sx={{ textAlign: "center" }}
        title="Сравните аминокислотные последовательности"
      />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Form setResult={setResult} />
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 2,
            pb: "34px",
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Result string1={result.input1} string2={result.input2} />
        </Box>
      </CardContent>
    </Card>
  );
};
