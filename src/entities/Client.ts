import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm'
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {

  @Column({ type: 'numeric'})
  balance!: number;

  @Column({default: true, name: 'active'})
  is_active!:boolean;

  @Column({type: 'simple-json', nullable: true})
  additional_info!: {
    age: number;
    hair_color: string;
  }

  @Column({type:"simple-array", default:[]})
  family_members!: string[]

  // 一个"客户"对应多个"交易"
  @OneToMany(
    ()=>Transaction,
    transaction => transaction.client
  )
  transactions!: Transaction[];

  // "银行家"和"客户"多对多关系
  @ManyToMany(
    () => Banker
  )
  bankers!: Banker[]


  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}