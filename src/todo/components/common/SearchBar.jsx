import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/todo/store/uiSlice';
import { useDebounce } from '@/todo/hooks/useDebounce';

const DEBOUNCE_DELAY = 300;

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.todoUi.search);
  const [querySearch, setQuerySearch] = useState(search);
  const debouncedSearch = useDebounce(querySearch, DEBOUNCE_DELAY);

  useEffect(() => {
    setQuerySearch(search);
  }, [search]);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <TextField
      size="small"
      placeholder="Search by title or description..."
      value={querySearch}
      onChange={(e) => setQuerySearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ minWidth: 280 }}
    />
  );
}
