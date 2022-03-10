import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import type { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  console.log(pokemons)

  return (
    <Layout title='Listado de Pokémons'>

      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
           <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>

    </Layout>
  )
}


// construir en el yarn build, solo se puede usar en las paginas, se ejecuta en el servidor
// en producción solo se ejecuta una vez, solo llega al cliente las props 
export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }) )

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
