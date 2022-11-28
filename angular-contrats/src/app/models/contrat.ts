export interface Contrat{
  id: number;
  nom: string;
  dateDebut: Date;
  dateFin: ""  | null;
  nomClient: string;
  montant: number;
  modeDuPaiement: string;
}
