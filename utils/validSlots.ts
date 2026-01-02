export type EquipmentSlot =
  | 'weaponId'
  | 'shieldId'
  | 'helmetId'
  | 'armorId'
  | 'legId'
  | 'amuletId'
  | 'ring1Id'
  | 'ring2Id'
  | 'bootId';

export class UnequipDto {
  slot: EquipmentSlot;
}

export const VALID_SLOTS: EquipmentSlot[] = [
  'weaponId',
  'shieldId',
  'helmetId',
  'armorId',
  'legId',
  'amuletId',
  'ring1Id',
  'ring2Id',
  'bootId',
] as const;
