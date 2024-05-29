import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    location!: string

    @Column()
    local_time!: string

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    temp_c!: number

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    temp_f!: number

    @Column({ nullable: false })
    is_day!: number

    @Column({ nullable: true })
    condition!: string

    @Column()
    condition_img!: string

    @Column()
    wind_mph!: string

    @Column()
    wind_kph!: string

    @Column()
    humidity!: number

    @Column()
    createdAt!: string;
}