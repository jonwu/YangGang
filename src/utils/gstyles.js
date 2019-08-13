import React from "react";
import { StyleSheet } from "react-native";

export default theme => {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    p1: {
      color: theme.text(),
      fontSize: theme.regular
    },
    p1_10: {
      color: theme.text(0.1),
      fontSize: theme.regular
    },
    p1_50: {
      color: theme.text(0.5),
      fontSize: theme.regular
    },
    p1_bold: {
      color: theme.text(),
      fontSize: theme.regular,
      fontWeight: "bold"
    },
    p1_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.regular,
      fontWeight: "bold"
    },
    p1_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.regular,
      fontWeight: "bold"
    },
    caption: {
      color: theme.text(),
      fontSize: theme.small
    },
    caption_10: {
      color: theme.text(0.1),
      fontSize: theme.small
    },
    caption_50: {
      color: theme.text(0.5),
      fontSize: theme.small
    },
    caption_bold: {
      color: theme.text(),
      fontSize: theme.small,
      fontWeight: "bold"
    },
    caption_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.small,
      fontWeight: "bold"
    },
    caption_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.small,
      fontWeight: "bold"
    },
    footnote: {
      color: theme.text(),
      fontSize: theme.footnote
    },
    footnote_10: {
      color: theme.text(0.1),
      fontSize: theme.footnote
    },
    footnote_50: {
      color: theme.text(0.5),
      fontSize: theme.footnote
    },
    footnote_bold: {
      color: theme.text(),
      fontSize: theme.footnote,
      fontWeight: "bold"
    },
    footnote_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.footnote,
      fontWeight: "bold"
    },
    footnote_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.footnote,
      fontWeight: "bold"
    },
    h1: {
      color: theme.text(),
      fontSize: theme.H1
    },
    h1_10: {
      color: theme.text(0.1),
      fontSize: theme.H1
    },
    h1_50: {
      color: theme.text(0.5),
      fontSize: theme.H1
    },
    h1_bold: {
      color: theme.text(),
      fontSize: theme.H1,
      fontWeight: "bold"
    },
    h1_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H1,
      fontWeight: "bold"
    },
    h1_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H1,
      fontWeight: "bold"
    },
    h0: {
      color: theme.text(),
      fontSize: theme.H0
    },
    h0_10: {
      color: theme.text(0.1),
      fontSize: theme.H0
    },
    h0_50: {
      color: theme.text(0.5),
      fontSize: theme.H0
    },
    h0_bold: {
      color: theme.text(),
      fontSize: theme.H0,
      fontWeight: "bold"
    },
    h0_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H0,
      fontWeight: "bold"
    },
    h0_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H0,
      fontWeight: "bold"
    },
    h2: {
      color: theme.text(),
      fontSize: theme.H2
    },
    h2_10: {
      color: theme.text(0.1),
      fontSize: theme.H2
    },
    h2_50: {
      color: theme.text(0.5),
      fontSize: theme.H2
    },
    h2_bold: {
      color: theme.text(),
      fontSize: theme.H2,
      fontWeight: "bold"
    },
    h2_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H2,
      fontWeight: "bold"
    },
    h2_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H2,
      fontWeight: "bold"
    },
    h3: {
      color: theme.text(),
      fontSize: theme.H3
    },
    h3_10: {
      color: theme.text(0.1),
      fontSize: theme.H3
    },
    h3_50: {
      color: theme.text(0.5),
      fontSize: theme.H3
    },
    h3_bold: {
      color: theme.text(),
      fontSize: theme.H3,
      fontWeight: "bold"
    },
    h3_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H3,
      fontWeight: "bold"
    },
    h3_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H3,
      fontWeight: "bold"
    },
    h4: {
      color: theme.text(),
      fontSize: theme.H4
    },
    h4_10: {
      color: theme.text(0.1),
      fontSize: theme.H4
    },
    h4_50: {
      color: theme.text(0.5),
      fontSize: theme.H4
    },
    h4_bold: {
      color: theme.text(),
      fontSize: theme.H4,
      fontWeight: "bold"
    },
    h4_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H4,
      fontWeight: "bold"
    },
    h4_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H4,
      fontWeight: "bold"
    },
    h5: {
      color: theme.text(),
      fontSize: theme.H5
    },
    h5_10: {
      color: theme.text(0.1),
      fontSize: theme.H5
    },
    h5_50: {
      color: theme.text(0.5),
      fontSize: theme.H5
    },
    h5_bold: {
      color: theme.text(),
      fontSize: theme.H5,
      fontWeight: "bold"
    },
    h5_bold_10: {
      color: theme.text(0.1),
      fontSize: theme.H5,
      fontWeight: "bold"
    },
    h5_bold_50: {
      color: theme.text(0.5),
      fontSize: theme.H5,
      fontWeight: "bold"
    },
    flex_column: {
      display: "flex",
      flexDirection: "column"
    },
    flex_row: {
      display: "flex",
      flexDirection: "row"
    },
    bottom_5: {
      marginBottom: theme.spacing_5
    },
    bottom_4: {
      marginBottom: theme.spacing_4
    },
    bottom_3: {
      marginBottom: theme.spacing_3
    },
    bottom_2: {
      marginBottom: theme.spacing_2
    },
    bottom_1: {
      marginBottom: theme.spacing_1
    },
    left_5: {
      marginLeft: theme.spacing_5
    },
    left_4: {
      marginLeft: theme.spacing_4
    },
    left_3: {
      marginLeft: theme.spacing_3
    },
    left_2: {
      marginLeft: theme.spacing_2
    },
    left_1: {
      marginLeft: theme.spacing_1
    },
    right_5: {
      marginRight: theme.spacing_5
    },
    right_4: {
      marginRight: theme.spacing_4
    },
    right_3: {
      marginRight: theme.spacing_3
    },
    right_2: {
      marginRight: theme.spacing_2
    },
    right_1: {
      marginRight: theme.spacing_1
    },
    top_5: {
      marginTop: theme.spacing_5
    },
    top_4: {
      marginTop: theme.spacing_4
    },
    top_3: {
      marginTop: theme.spacing_3
    },
    top_2: {
      marginTop: theme.spacing_2
    },
    top_1: {
      marginTop: theme.spacing_1
    },
    line: {
      alignSelf: "stretch",
      height: theme.borderWidth
    },
    vertical_line: {
      alignSelf: "stretch",
      minWidth: theme.borderWidth
    },
    border: {
      borderRadius: theme.borderRadius,
      borderColor: theme.borderColor,
      borderWidth: theme.borderWidth,
      borderStyle: "solid"
    }
  });
};
