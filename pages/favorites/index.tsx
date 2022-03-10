import { Container, Text, Image, Grid, Card } from '@nextui-org/react'
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { useEffect, useState } from 'react';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavouritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title="Pokémons - Favoritos">

      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : ( <FavoritePokemons pokemons={favoritePokemons} />)
      }

    </Layout>
  )
}

export default FavouritesPage
