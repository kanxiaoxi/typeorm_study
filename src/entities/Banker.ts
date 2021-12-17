import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Client } from './Client';
import { Person } from './utils/Person';

@Entity('banker')
export class Banker extends Person {

  @Column({unique:true, length: 10})
  employee_number!: string;

  // "银行家"和"客户"多对多关系
  @ManyToMany(
    () => Client,
    {
      cascade: true
    }
  )
  @JoinTable({
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id'
    }
  })
  clients!: Client[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}

// client_id  banker_id
//    1         3
//    1         2
//    2         3
