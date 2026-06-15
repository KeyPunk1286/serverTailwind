import { hash, compare } from "bcrypt";

export class UserEntity{
  private _passwod: string
  constructor(
    private readonly _email: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _details: string,
    passHash?: string
  ) { 
    if (passHash) {
      this._passwod = passHash
    }
  }
  
  
  
  get email():string {
    return this._email
  }
  get firstName():string {
    return this._firstName
  }
  get lastName():string {
    return this._lastName
  }
  get details():string {
    return this._details
  }
  get password(): string{
    return this._passwod
  }
  public async setPassword(pass: string, salt: number) {
    this._passwod = await hash(pass, salt)
  }
  public async comparePass(pass:string, ) {
    return compare(pass, this._passwod)
  }
}