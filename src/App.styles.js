import { createStyles } from "@material-ui/core/styles";

export default function styles({spacing, backgroundColor}) {
  return createStyles({
    root: {
      backgroundColor: backgroundColor
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
    divider: {
      marginTop: spacing(4),
    },
  });
}
