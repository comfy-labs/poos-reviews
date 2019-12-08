import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useAutocompleteService from "./use-autocomplete-service";

function GoogleSearchBox({ google, isDisabled, onLocationSelect, text }) {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const { fetchPredictions, isLoading, predictions } = useAutocompleteService(
    google
  );

  function handleChange(event) {
    setInputValue(event.target.value);
    fetchPredictions(event.target.value);
    setIsOpen(event.target.value !== "");
  }

  function handleOutsideClick() {
    setIsOpen(false);
  }

  return (
    <>
      <TextField
        disabled={isDisabled}
        fullWidth
        id="location"
        InputLabelProps={{ shrink: true }}
        label="Search"
        margin="dense"
        onChange={handleChange}
        inputRef={inputRef}
        value={inputValue}
        variant="outlined"
      />
      <Popper
        anchorEl={inputRef.current}
        style={{ zIndex: 2 }}
        disablePortal
        open={isOpen}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper style={{ width: inputRef.current.offsetWidth }}>
              <ClickAwayListener onClickAway={handleOutsideClick}>
                {isLoading ? (
                  <LinearProgress />
                ) : (
                  <MenuList dense>
                    {predictions.map(prediction => (
                      <MenuItem
                        key={prediction.place_id}
                        onClick={() => {
                          onLocationSelect(prediction);
                          setInputValue(prediction.description);
                          setIsOpen(false);
                        }}
                        value={prediction.place_id}
                      >
                        <Typography noWrap variant="inherit">
                          {prediction.description}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

GoogleSearchBox.propsTypes = {
  google: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

GoogleSearchBox.defaultProps = {
  isDisabled: false
};

export default GoogleSearchBox;
