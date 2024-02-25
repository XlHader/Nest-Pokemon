import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: FetchAdapter
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=700'
    );

    const pokemons = data.results.map((pokemon) => {
      const no: number = +pokemon.url.split('/')[6];
      const name = pokemon.name;
      return { no, name };
    });

    try {
      await this.pokemonModel.insertMany(pokemons);
    } catch (error) {
      return { message: 'Seed failed, existing data' };
    }

    return { message: 'Seed executed' };
  }
}
