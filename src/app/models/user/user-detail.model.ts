export interface  User{

    id: string;                   // ID do usuário
    name: string;                 // Nome do usuário
    email: string;                // Email do usuário
    smartPhoneNumber: string;     // Número de telefone
    jobPosition: string | null;   // Cargo do usuário
    active: boolean;              // Status do usuário


}