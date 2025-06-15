import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { FC } from "react";
import { AminoAcids } from "../types";

const ErrorField = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <Typography
      color="error"
      variant="caption"
      sx={{ mt: 0.5, display: "block", lineHeight: 1.2 }}
    >
      {error}
    </Typography>
  );
};

const REQUIRED_MESSAGE = "Обязательно для заполнения";

const ERROR_MESSAGE =
  "Может содержать только латинские буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -.";

const regex = /^[ARNDCEQGHILKMFPSTWYVarndceqghilkmfpstwyv-]+$/;

const schema = z
  .object({
    input1: z.string().min(1, { message: REQUIRED_MESSAGE }).regex(regex, {
      message: ERROR_MESSAGE,
    }),
    input2: z.string().min(1, { message: REQUIRED_MESSAGE }).regex(regex, {
      message: ERROR_MESSAGE,
    }),
    _lengthCompare: z.optional(z.string()),
  })
  .refine(
    (data) =>
      data.input1.replace(/-/g, "").length ===
      data.input2.replace(/-/g, "").length,
    {
      message:
        "Длина введенных последовательностей в обоих полях должна быть одинаковой",
      path: ["_lengthCompare"],
    }
  );

type FormData = z.infer<typeof schema>;

const transformString = (string: string) =>
  string.replace(/-/g, "").toUpperCase();

export const Form: FC<{
  setResult: React.Dispatch<
    React.SetStateAction<{
      input1: AminoAcids;
      input2: AminoAcids;
    }>
  >;
}> = ({ setResult }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setResult({
      input1: transformString(data.input1) as AminoAcids,
      input2: transformString(data.input2) as AminoAcids,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems="start"
        gap={2}
        sx={{ mb: 3 }}
      >
        <TextField
          {...register("input1")}
          error={!!errors.input1}
          helperText={errors.input1?.message}
          fullWidth
          sx={{
            "& .Mui-error": {
              lineHeight: 1.2,
            },
          }}
        />
        <TextField
          {...register("input2")}
          error={!!errors.input2}
          helperText={errors.input2?.message}
          fullWidth
          sx={{
            "& .Mui-error": {
              lineHeight: 1.2,
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="outlined"
        size="large"
        sx={{
          width: "100%",
        }}
      >
        Сравнить
      </Button>
      {!errors.input1 && !errors.input2 && (
        <ErrorField error={errors["_lengthCompare"]?.message} />
      )}
    </form>
  );
};
