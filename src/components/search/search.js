import axios from "axios";
import {  useState } from "react";
import { GEO_API_URL, QWeatherApiKey } from "../../api";
import { AsyncPaginate } from "react-select-async-paginate";
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState("");

	const loadOptions = (inputValue) => {
		console.log(inputValue);
		return (
			inputValue &&
			axios({
				method: "get",
				url: GEO_API_URL,
				params: {
					location: inputValue,
					key: QWeatherApiKey,
				},
			}).then((res) => {
                console.log('trigger')
				return {
					options: res?.data.location.map((city) => {
						return {
							value: `${city.lat} ${city.lon}`,
							label: `${city.adm2},${city.country},${city.adm1}`,
						};
					}),
				};
			})
		);
	};

	const handleOnChange = (searchData) => {
		console.log(searchData);
		setSearch(searchData);
        onSearchChange(searchData)
	};

    const handleOnFocus=()=>{
        setSearch('')
    }

	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
            onFocus={handleOnFocus}
		/>
	);
};

export default Search;
