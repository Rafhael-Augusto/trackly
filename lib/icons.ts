import {
  BanknoteIcon,
  BookAIcon,
  BrushCleaningIcon,
  CalculatorIcon,
  ClipboardListIcon,
  NotebookTextIcon,
  PackageIcon,
  PencilIcon,
  SendIcon,
  ShoppingCartIcon,
  ShowerHeadIcon,
  SquarePenIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";

export const iconsMap = {
  calculadora: CalculatorIcon,
  livro: BookAIcon,
  chuveiro: ShowerHeadIcon,
  carteira: WalletIcon,
  dinheiro: BanknoteIcon,
  enviar: SendIcon,
  pacote: PackageIcon,
  caderno: NotebookTextIcon,
  lapis: PencilIcon,
  limpar: BrushCleaningIcon,
  editar: SquarePenIcon,
  carrinho: ShoppingCartIcon,
  prancheta: ClipboardListIcon,
  usuario: UserIcon,
} as const;

export const iconsName = Object.keys(iconsMap) as (keyof typeof iconsMap)[];

export const iconsList = Object.entries(iconsMap).map(([name, component]) => ({
  name,
  component,
}));
