export class UserEntity{
  private _passwod: string
  constructor(
    private readonly _email: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _details: string
  ) { }
  
  
  
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
  
}