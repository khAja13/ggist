type InputType = "email" | "password"
type Provider = "EMAIL" | "GOOGLE" | "GITHUB"

interface AuthFormInputsType {
    labelField: string,
    inputName: InputType
}

interface UserWithGistType {
    id: string,
    createdAt: Date,
    email: string,
    password: string,
    name: string,
    picture?: string,
    provider: Provider,
    gists?: Gists[]
}

interface Gists {
    id: string,
    createdAt: Date,
    title: string,
    content: string,
    updatedAt: Date;
}