import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { Character } from '../entities/character.entity';

export abstract class CharacterRepository {
  abstract create(data: CreateCharacterDto): Promise<Character>;
  abstract findByNickname(nickname: string): Promise<Character | null>;
  abstract findAll(): Promise<Character[]>;
  abstract findById(id: string): Promise<Character | null>;
  abstract update(id: string, data: UpdateCharacterDto): Promise<void>;
  abstract incrementGold(id: string, gold: number): Promise<void>;
}
