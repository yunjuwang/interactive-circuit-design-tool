import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiPaper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import flexsearch from "flexsearch";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import SvgIcon from "@mui/material/SvgIcon";
import * as mui from "@mui/icons-material";
import synonyms from "./synonyms";

const FlexSearchIndex = flexsearch.Index;

if (process.env.NODE_ENV !== "production") {
  Object.keys(synonyms).forEach((icon) => {
    if (!mui[icon]) {
      console.warn(
        `The icon ${icon} no longer exists. Remove it from \`synonyms\``
      );
    }
  });
}

function selectNode(node) {
  // Clear any current selection
  const selection = window.getSelection();
  selection.removeAllRanges();

  // Select code
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
}

const iconWidth = 35;

const SVG_ICON_CLASS = "svg-icon";

const StyledIcon = styled("span")(({ theme }) => ({
  display: "inline-flex",
  flexDirection: "column",
  color: theme.palette.text.secondary,
  margin: "0 4px",
  "& > div": {
    flexGrow: 1,
    fontSize: ".6rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: `calc(${iconWidth}px + ${theme.spacing(2)} * 2 + 2px)`,
  },
  [`& .${SVG_ICON_CLASS}`]: {
    width: iconWidth,
    height: iconWidth,
    boxSizing: "content-box",
    cursor: "pointer",
    color: theme.palette.text.primary,
    border: "1px solid transparent",
    fontSize: iconWidth,
    borderRadius: "12px",
    transition: theme.transitions.create(["background-color", "box-shadow"], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: theme.spacing(2),
    margin: theme.spacing(0.5, 0),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.light,
    },
  },
}));

function handleLabelClick(event) {
  selectNode(event.currentTarget);
}

function isElmVisible(elm, margin = 0) {
  const rect = elm.getBoundingClientRect();
  return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
}

function Icon(props) {
  const { icon, onIconClick, initiallyVisible = false } = props;

  const rootRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(initiallyVisible);

  // Virtualize the icons to reduce page size and React rendering time.
  // Only render the icons after they become visible in the viewport.
  React.useEffect(() => {
    const margin = 200;
    const root = /** @type {SVGElement} */ (rootRef.current);
    if (initiallyVisible || isElmVisible(root, margin)) {
      setIsVisible(true);
      return () => {};
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (isElmVisible(entries[0].target, margin)) {
          setIsVisible(true);
        }
      },
      { rootMargin: `${margin}px 0px` }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
    };
  }, [initiallyVisible]);

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <StyledIcon key={icon.importName} ref={rootRef}>
      {isVisible ? (
        <SvgIcon
          component={icon.Component}
          className={SVG_ICON_CLASS}
          tabIndex={-1}
          onClick={onIconClick}
          title={icon.importName}
        />
      ) : (
        <div className={SVG_ICON_CLASS} />
      )}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO: a11y */}
      <div onClick={handleLabelClick}>{icon.importName}</div>
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
    </StyledIcon>
  );
}

const Icons = React.memo(function Icons(props) {
  const { icons, handleIconClick } = props;

  return (
    <div>
      {icons.map((icon, i) => (
        <Icon
          key={icon.importName}
          icon={icon}
          onIconClick={handleIconClick}
          // Render the first 35 icons immediately as they would be visible on page load
          initiallyVisible={i < 35}
        />
      ))}
    </div>
  );
});

Icons.propTypes = {
  handleIconClick: PropTypes.func.isRequired,
  icons: PropTypes.array.isRequired,
};

const Form = styled("form")({
  position: "sticky",
  top: 0,
});

const Paper = styled(MuiPaper)(({ theme }) => ({
  position: "sticky",
  top: 0,
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  width: "100%",
  borderRadius: "12px",
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: "none",
}));

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

const Input = styled(InputBase)({
  flex: 1,
});

const searchIndex = new FlexSearchIndex({
  tokenize: "full",
});

const allIconsMap = {};
const allIcons = Object.keys(mui)
  .filter((importName) => !importName.endsWith("TwoTone")) // remove "Two Tone" icon
  .sort()
  .map((importName) => {
    let theme = "Filled";
    let name = importName;

    for (const currentTheme of ["Outlined", "Rounded", "TwoTone", "Sharp"]) {
      if (importName.endsWith(currentTheme)) {
        theme = currentTheme === "TwoTone" ? "Two tone" : currentTheme;
        name = importName.slice(0, -currentTheme.length);
        break;
      }
    }
    let searchable = name;
    if (synonyms[searchable]) {
      searchable += ` ${synonyms[searchable]}`;
    }
    searchIndex.add(importName, searchable);

    const icon = {
      importName,
      name,
      theme,
      Component: mui[importName],
    };
    allIconsMap[importName] = icon;
    return icon;
  });

/**
 * Returns the last defined value that has been passed in [value]
 */
function useLatest(value) {
  const latest = React.useRef(value);
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      latest.current = value;
    }
  }, [value]);
  return value ?? latest.current;
}

export default function SearchIcons({ setSelectedIcon }) {
  const [theme, setTheme] = React.useState("Filled");
  const [query, setQuery] = React.useState("");

  const handleIconClick = React.useCallback(
    (event) => {
      setSelectedIcon(event.currentTarget.getAttribute("title"));
    },
    [setSelectedIcon]
  );

  const icons = React.useMemo(() => {
    const keys =
      query === "" ? null : searchIndex.search(query, { limit: 3000 });
    return (
      keys === null ? allIcons : keys.map((key) => allIconsMap[key])
    ).filter((icon) => theme === icon.theme);
  }, [query, theme]);

  const deferredIcons = React.useDeferredValue(icons);

  const isPending = deferredIcons !== icons;

  return (
    <Grid container sx={{ minHeight: 500 }}>
      <Grid item xs={12} sm={3}>
        <Form>
          <Typography fontWeight={500} sx={{ mb: 1 }}>
            Filter the style
          </Typography>
          <RadioGroup
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            {/* {["Filled", "Outlined", "Rounded", "Two tone", "Sharp"].map( */}
            {["Filled", "Outlined", "Rounded", "Sharp"].map((currentTheme) => {
              return (
                <FormControlLabel
                  key={currentTheme}
                  value={currentTheme}
                  control={<Radio size="small" />}
                  label={currentTheme}
                />
              );
            })}
          </RadioGroup>
        </Form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper>
          <IconButton sx={{ padding: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icons…"
            inputProps={{ "aria-label": "search icons" }}
            endAdornment={
              isPending ? (
                <InputAdornment position="end">
                  <CircularProgress size={16} sx={{ mr: 2 }} />
                </InputAdornment>
              ) : null
            }
          />
        </Paper>
        <Typography sx={{ mb: 1 }}>{`${formatNumber(
          icons.length
        )} matching results`}</Typography>
        <Icons icons={deferredIcons} handleIconClick={handleIconClick} />
      </Grid>
    </Grid>
  );
}
