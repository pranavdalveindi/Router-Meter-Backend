import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "router_events" })
export class RouterEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "device_id", type: "text" })
  deviceId!: string;

  @Column({ type: "bigint" })
  timestamp!: string; // keep string for bigint safety

  @Column({ type: "integer" })
  type!: number;

  @Column({ type: "jsonb" })
  details!: any;
}