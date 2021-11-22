import { Pessoa } from "./Pessoa";

export interface Funcionario extends Pessoa {
    matricula: string 
    ctps: string
    cargo: string
    dataAdmissao: Date | String
    salario: Number
    // hospedagem: Hospedagem
}