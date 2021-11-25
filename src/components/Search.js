import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';

const Search = ({ onSearch, placeholder }) => {
    const [search, setSearch] = useState("");

    const onSearchChange = value => {
        setSearch(value);
        onSearch(value);
      
    };
    return (

        <TextField
            name="search"
            variant="outlined"
            autoComplete="off"
            fullWidth
            size="small"
            label="Job title, keywords..."
            value={search} onChange={e => onSearchChange(e.target.value)}
        />

    )
}

export default Search
