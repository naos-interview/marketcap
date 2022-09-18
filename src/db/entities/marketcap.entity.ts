import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Marketcap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  marketcap: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
