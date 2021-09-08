import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import { Genre } from 'types/Genre';
import { requestBackend } from 'utils/request';
import './styles.scss';

type Props = {
  onChangeGenre: Function;
};

const Filter = ({ onChangeGenre }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const getGenres = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/genres',
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setGenres(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  const handleChangeGenre = (value?: Genre) => {
    onChangeGenre(value?.id);
  };

  return (
    <Select
      options={genres}
      classNamePrefix="genre-select"
      isClearable
      getOptionLabel={(genre) => genre.name}
      getOptionValue={(genre) => String(genre.id)}
      onChange={(value) => handleChangeGenre(value as Genre)}
    ></Select>
  );
};

export default Filter;
