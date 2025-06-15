import { useRef, useState } from "react";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import { AminoAcids } from "../types";
import { useSelectText } from "../hooks/useSelectText";

const colorsMap = {
  [AminoAcids.C]: "#FFE00",
  [AminoAcids.A]: "#67E4A6",
  [AminoAcids.I]: "#67E4A6",
  [AminoAcids.L]: "#67E4A6",
  [AminoAcids.M]: "#67E4A6",
  [AminoAcids.F]: "#67E4A6",
  [AminoAcids.W]: "#67E4A6",
  [AminoAcids.Y]: "#67E4A6",
  [AminoAcids.V]: "#67E4A6",
  [AminoAcids.P]: "#67E4A6",
  [AminoAcids.G]: "#C4C4C4",
  [AminoAcids.D]: "#FC9CAC",
  [AminoAcids.E]: "#FC9CAC",
  [AminoAcids.K]: "#BB99FF",
  [AminoAcids.R]: "#BB99FF",
  [AminoAcids.S]: "#80BFFF",
  [AminoAcids.T]: "#80BFFF",
  [AminoAcids.H]: "#80BFFF",
  [AminoAcids.Q]: "#80BFFF",
  [AminoAcids.N]: "#80BFFF",
};

const ALERT_DURATION = 1000;
const SLIDE_ENTER_DURATION = 500;
const SLIDE_EXIT_DURATION = 250;
const TOTAL_ALERT_DURATION =
  ALERT_DURATION + SLIDE_ENTER_DURATION + SLIDE_EXIT_DURATION;

const SlideTransition = (props: SlideProps) => {
  return (
    <Slide
      {...props}
      timeout={{ enter: SLIDE_ENTER_DURATION, exit: SLIDE_EXIT_DURATION }}
      direction="down"
    />
  );
};

export const Result = ({
  string1,
  string2,
}: {
  string1: string;
  string2: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useSelectText(containerRef, () => setIsAlertOpen(true));

  const handleClose = (_: unknown, reason: string) => {
    if (reason === "clickaway") return;
    setIsAlertOpen(false);
  };

  const stringWrapProps = {
    display: "contents",
    sx: { verticalAlign: "top", wordBreak: "break-word" },
  };

  const charWrapProps = {
    component: "span",
    display: "inline",
    borderRadius: "4px",
    lineHeight: "40px",
    fontFamily: "monospace",
    letterSpacing: "normal",
    sx: { verticalAlign: "top" },
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={TOTAL_ALERT_DURATION}
        open={isAlertOpen}
        onClose={handleClose}
        slots={{ transition: SlideTransition }}
      >
        <Alert
          severity="info"
          icon={false}
          sx={(theme) => ({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.info.dark,
          })}
        >
          <Typography variant="body1">
            Текст скопирован в буфер обмена!
          </Typography>
        </Alert>
      </Snackbar>
      <Box position="relative" ref={containerRef}>
        <Box {...stringWrapProps}>
          {string1.split("").map((item) => (
            <Typography
              {...charWrapProps}
              sx={{
                verticalAlign: "top",
                backgroundColor: colorsMap[item as AminoAcids],
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Box position="absolute" top={20}>
          <Box {...stringWrapProps}>
            {string2.split("").map((item, i) => (
              <Typography
                {...charWrapProps}
                {...(string1[i] !== item && {
                  sx: { backgroundColor: colorsMap[item as AminoAcids] },
                })}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
