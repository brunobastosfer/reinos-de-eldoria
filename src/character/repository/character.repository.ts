import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterStatsDto } from '../dto/update-character-stats.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { CharacterEquipment } from '../entities/character-equipment.entity';
import { Character } from '../entities/character.entity';

export abstract class CharacterRepository {
  abstract create(data: CreateCharacterDto): Promise<Character>;
  abstract findByNickname(nickname: string): Promise<Character | null>;
  abstract findAll(): Promise<Character[]>;
  abstract findById(id: string): Promise<Character | null>;
  abstract update(id: string, data: UpdateCharacterDto): Promise<void>;
  abstract updateStats(
    id: string,
    data: UpdateCharacterStatsDto,
  ): Promise<void>;
  abstract incrementGold(id: string, gold: number): Promise<void>;
  abstract updateCharacterProgress(
    characterId: string,
    actualExperience: number,
  ): Promise<void>;
  abstract updateCharacterLvl(
    characterId: string,
    characterProgressId: string,
    lvl: number,
    actualExperience: number,
  ): Promise<void>;
  abstract findEquipmentByCharacterId(
    id: string,
  ): Promise<CharacterEquipment | null>;
}
